import React, { useState } from 'react';
import Card from '../components/Card';
import { 
  Heart, 
  Sun, 
  Moon, 
  Zap, 
  Brain,
  Headphones,
  Book,
  Activity,
  Coffee,
  Users,
  Play,
  ChevronRight
} from 'lucide-react';

/**
 * Wellness resources and activities page
 */
const Wellness = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: Heart },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
    { id: 'exercise', label: 'Exercise', icon: Activity },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'social', label: 'Social', icon: Users }
  ];

  const wellnessContent = {
    affirmations: [
      "I am worthy of love and respect, including from myself.",
      "My challenges are opportunities for growth and learning.",
      "I have the strength to handle whatever comes my way.",
      "Every day, I am becoming more confident and resilient.",
      "I choose to focus on what I can control and let go of what I cannot."
    ],
    
    tips: [
      {
        id: 1,
        category: 'mindfulness',
        title: 'Practice Deep Breathing',
        description: 'Try the 4-7-8 technique: inhale for 4, hold for 7, exhale for 8',
        icon: Brain,
        color: 'blue',
        timeEstimate: '2-5 minutes'
      },
      {
        id: 2,
        category: 'exercise',
        title: 'Take a Nature Walk',
        description: 'Spending time outdoors can reduce stress and improve mood',
        icon: Sun,
        color: 'green',
        timeEstimate: '15-30 minutes'
      },
      {
        id: 3,
        category: 'sleep',
        title: 'Create a Bedtime Routine',
        description: 'Consistent sleep schedule improves mental health',
        icon: Moon,
        color: 'purple',
        timeEstimate: '30-60 minutes'
      },
      {
        id: 4,
        category: 'mindfulness',
        title: 'Mindful Journaling',
        description: 'Write down three things you\'re grateful for each day',
        icon: Book,
        color: 'yellow',
        timeEstimate: '5-15 minutes'
      },
      {
        id: 5,
        category: 'social',
        title: 'Connect with Friends',
        description: 'Reach out to someone you care about',
        icon: Users,
        color: 'pink',
        timeEstimate: '10+ minutes'
      },
      {
        id: 6,
        category: 'exercise',
        title: 'Gentle Stretching',
        description: 'Simple stretches can release physical and mental tension',
        icon: Activity,
        color: 'orange',
        timeEstimate: '10-20 minutes'
      }
    ],

    activities: [
      {
        id: 1,
        title: 'Guided Meditation',
        description: 'Follow along with a calming meditation session',
        icon: Headphones,
        color: 'blue',
        duration: '10-20 minutes',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        title: 'Progressive Muscle Relaxation',
        description: 'Systematically tense and relax muscle groups',
        icon: Zap,
        color: 'green',
        duration: '15-25 minutes',
        difficulty: 'Beginner'
      },
      {
        id: 3,
        title: 'Mindful Tea/Coffee Break',
        description: 'Practice mindfulness while enjoying a warm beverage',
        icon: Coffee,
        color: 'yellow',
        duration: '5-10 minutes',
        difficulty: 'Beginner'
      }
    ]
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      pink: 'text-pink-600 bg-pink-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colors[color] || colors.blue;
  };

  const filteredTips = activeCategory === 'all' 
    ? wellnessContent.tips 
    : wellnessContent.tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Wellness Resources 🌱
        </h1>
        <p className="text-gray-600">
          Discover tools and activities to support your mental wellness journey
        </p>
      </div>

      {/* Daily affirmation */}
      <Card title="Today's Affirmation">
        <div className="text-center py-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-4">
            <p className="text-lg font-medium text-gray-900 mb-3">
              "{wellnessContent.affirmations[new Date().getDay()]}"
            </p>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
              Share this affirmation →
            </button>
          </div>
        </div>
      </Card>

      {/* Category filters */}
      <Card title="Explore by Category">
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wellness tips */}
          <Card title="Wellness Tips & Techniques">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(tip.color)}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                          {tip.title}
                        </h4>
                        <p className="text-sm text-gray-500">{tip.timeEstimate}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        {tip.category}
                      </span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Guided activities */}
          <Card title="Guided Activities">
            <div className="space-y-4">
              {wellnessContent.activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className={`p-3 rounded-lg ${getColorClasses(activity.color)}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{activity.duration}</span>
                        <span>•</span>
                        <span>{activity.difficulty}</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                      <Play size={16} />
                      <span className="hidden sm:inline">Start</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick mood check */}
          <Card title="Quick Mood Check">
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-4">
                How are you feeling right now?
              </p>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((mood) => (
                  <button
                    key={mood}
                    className="aspect-square rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-center text-2xl"
                  >
                    {mood <= 2 ? '😢' : mood === 3 ? '😐' : mood <= 4 ? '🙂' : '😊'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Track your mood throughout the day
              </p>
            </div>
          </Card>

          {/* Emergency resources */}
          <Card title="Need Support Now?">
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-medium text-blue-900 mb-1">Campus Counseling</h5>
                <p className="text-sm text-blue-700">
                  Available 24/7 for students
                </p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 mt-1">
                  Contact Now →
                </button>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h5 className="font-medium text-green-900 mb-1">Crisis Text Line</h5>
                <p className="text-sm text-green-700">
                  Text HOME to 741741
                </p>
                <button className="text-green-600 text-sm font-medium hover:text-green-700 mt-1">
                  Learn More →
                </button>
              </div>
            </div>
          </Card>

          {/* Wellness streak */}
          <Card title="Wellness Streak">
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                5 days
              </div>
              <p className="text-sm text-gray-600 mb-3">
                You've been consistent with wellness activities!
              </p>
              <div className="flex justify-center space-x-1 mb-3">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      day <= 5 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {day <= 5 ? '✓' : day}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Keep going to reach your 7-day goal!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Wellness;