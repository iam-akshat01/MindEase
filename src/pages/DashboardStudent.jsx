import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMoodData, saveMoodEntry } from '../services/moodService';
import Card, { StatsCard } from '../components/Card';
import MoodGraph from '../components/MoodGraph';
import { 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  Calendar,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

/**
 * Student dashboard with mood tracking and quick actions
 */
const DashboardStudent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [todayMood, setTodayMood] = useState(null);
  const [showMoodEntry, setShowMoodEntry] = useState(false);

  // Load mood data on component mount
  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    try {
      const data = await getMoodData(user.id, 7);
      setMoodData(data);
      
      // Check if user has logged mood today
      const today = new Date().toISOString().split('T')[0];
      const todayEntry = data.find(entry => entry.date === today);
      setTodayMood(todayEntry);
      
    } catch (error) {
      console.error('Failed to load mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSubmit = async (moodLevel) => {
    try {
      const moodEntry = {
        userId: user.id,
        date: new Date().toISOString().split('T')[0],
        mood: moodLevel,
        energy: 3, // Default values for quick entry
        stress: 3,
        notes: ''
      };

      await saveMoodEntry(moodEntry);
      await loadMoodData(); // Refresh data
      setShowMoodEntry(false);
      
    } catch (error) {
      console.error('Failed to save mood entry:', error);
    }
  };

  // Calculate mood statistics
  const getStats = () => {
    if (moodData.length === 0) return { average: 0, trend: 'neutral', streak: 0 };

    const average = moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length;
    const recentAvg = moodData.slice(-3).reduce((sum, entry) => sum + entry.mood, 0) / 3;
    const olderAvg = moodData.slice(0, -3).reduce((sum, entry) => sum + entry.mood, 0) / (moodData.length - 3) || recentAvg;
    
    const trend = recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';
    
    return { average: average.toFixed(1), trend, streak: moodData.length };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mr-5">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600">
          How are you feeling today? Your mental wellness journey matters.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Average Mood"
          value={stats.average}
          change={stats.trend === 'improving' ? '+0.2 this week' : stats.trend === 'declining' ? '-0.1 this week' : 'Stable'}
          icon={<TrendingUp size={20} />}
          color="blue"
        />
        <StatsCard
          title="Check-in Streak"
          value={`${stats.streak} days`}
          change="Keep it up!"
          icon={<Calendar size={20} />}
          color="green"
        />
        <StatsCard
          title="Wellness Score"
          value="Good"
          change="Based on recent entries"
          icon={<Heart size={20} />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood tracking section */}
          <Card title="Your Mood Journey">
            {!todayMood ? (
              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    How are you feeling today?
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Take a moment to check in with yourself
                  </p>
                  <div className="flex space-x-3">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleMoodSubmit(level)}
                        className={`
                          p-3 rounded-full transition-all duration-200
                          ${level <= 2 ? 'hover:bg-red-100 text-red-600' : 
                            level === 3 ? 'hover:bg-yellow-100 text-yellow-600' :
                            'hover:bg-green-100 text-green-600'
                          }
                          hover:scale-110
                        `}
                        title={`Mood level ${level}`}
                      >
                        {level <= 2 ? <Frown size={24} /> :
                         level === 3 ? <Meh size={24} /> :
                         <Smile size={24} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">
                    ✅ You've already logged your mood today! Your mood was{' '}
                    <span className="font-medium">
                      {todayMood.mood}/5
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Mood graph */}
            <MoodGraph data={moodData} height={250} />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <button
                onClick={() => navigate('/chat')}
                className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <MessageCircle className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-blue-900">Chat with AI Assistant</p>
                  <p className="text-sm text-blue-600">Get support anytime</p>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/wellness')}
                className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <Heart className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-900">Wellness Resources</p>
                  <p className="text-sm text-green-600">Tips and activities</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Daily affirmation */}
          <Card title="Today's Affirmation">
            <div className="text-center py-4">
              <p className="text-lg font-medium text-gray-900 mb-2">
                "You are stronger than you think and more resilient than you know."
              </p>
              <p className="text-sm text-gray-600">
                Remember this throughout your day ✨
              </p>
            </div>
          </Card>

          {/* Wellness tip */}
          <Card title="Wellness Tip">
            <div className="py-4">
              <h4 className="font-medium text-gray-900 mb-2">
                Practice Deep Breathing
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Try the 4-7-8 technique: Inhale for 4 counts, hold for 7, exhale for 8.
              </p>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Learn more →
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;