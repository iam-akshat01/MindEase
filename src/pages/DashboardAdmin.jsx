import React, { useState, useEffect } from 'react';
import { getPlatformAnalytics } from '../services/surveyService';
import Card, { StatsCard } from '../components/Card';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  BarChart,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';

/**
 * Admin dashboard for platform analytics and management
 */
const DashboardAdmin = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('month');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getPlatformAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Platform overview and analytics
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Users"
          value={analytics?.totalUsers?.toLocaleString() || '0'}
          change="+12% this month"
          icon={<Users size={20} />}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={analytics?.activeUsers?.toLocaleString() || '0'}
          change="+8% this month"
          icon={<Activity size={20} />}
          color="green"
        />
        <StatsCard
          title="Mood Entries"
          value={analytics?.moodEntries?.toLocaleString() || '0'}
          change="+23% this month"
          icon={<TrendingUp size={20} />}
          color="purple"
        />
        <StatsCard
          title="Stress Alerts"
          value={analytics?.stressAlerts || '0'}
          change="-5% this month"
          icon={<AlertTriangle size={20} />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main analytics area */}
        <div className="lg:col-span-2 space-y-6">
          {/* User growth chart */}
          <Card title="User Growth">
            <div className="mb-4">
              <div className="flex items-center space-x-4">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 6 months</option>
                  <option value="quarter">Last quarter</option>
                </select>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top stressors chart */}
          <Card title="Top Stress Factors">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={analytics?.topStressors || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wellness metrics */}
          <Card title="Wellness Metrics">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Average Mood Score</span>
                  <span className="font-medium">{analytics?.wellnessMetrics?.averageMoodScore}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(analytics?.wellnessMetrics?.averageMoodScore / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="font-medium">{analytics?.wellnessMetrics?.engagementRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${analytics?.wellnessMetrics?.engagementRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Satisfaction Score</span>
                  <span className="font-medium">{analytics?.wellnessMetrics?.satisfactionScore}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(analytics?.wellnessMetrics?.satisfactionScore / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Quick actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <BarChart className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-blue-900">Generate Report</p>
                  <p className="text-sm text-blue-600">Weekly analytics</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Users className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-900">Manage Users</p>
                  <p className="text-sm text-green-600">User administration</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <Settings className="text-purple-600" size={20} />
                <div>
                  <p className="font-medium text-purple-900">System Settings</p>
                  <p className="text-sm text-purple-600">Platform configuration</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Recent activity */}
          <Card title="Recent Activity">
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900">New user registration</p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900">Mood entry submitted</p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900">Stress alert triggered</p>
                  <p className="text-gray-500 text-xs">12 minutes ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;