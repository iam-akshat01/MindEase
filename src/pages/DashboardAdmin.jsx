import React, { useState, useEffect } from "react";
import { getPlatformAnalytics } from "../services/surveyService";
import Card, { StatsCard } from "../components/Card";
import {
  Users,
  Activity,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  BarChart as IconBarChart,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";

/**
 * Admin dashboard for platform analytics and management
 */
const DashboardAdmin = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("month");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getPlatformAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Platform overview and analytics
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={analytics?.totalUsers?.toLocaleString() || "0"}
          change="+12% this month"
          icon={<Users size={22} className="text-blue-500" />}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={analytics?.activeUsers?.toLocaleString() || "0"}
          change="+8% this month"
          icon={<Activity size={22} className="text-green-500" />}
          color="green"
        />
        <StatsCard
          title="Mood Entries"
          value={analytics?.moodEntries?.toLocaleString() || "0"}
          change="+23% this month"
          icon={<TrendingUp size={22} className="text-purple-500" />}
          color="purple"
        />
        <StatsCard
          title="Stress Alerts"
          value={analytics?.stressAlerts || "0"}
          change="-5% this month"
          icon={<AlertTriangle size={22} className="text-red-500" />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main analytics area */}
        <div className="lg:col-span-2 space-y-8">
          {/* User growth chart */}
          <Card title="User Growth" className="bg-white shadow-md rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
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

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.userGrowth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top stressors chart */}
          <Card title="Top Stress Factors" className="bg-white shadow-md rounded-2xl p-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={analytics?.topStressors || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#666" />
                <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Wellness metrics */}
          <Card title="Wellness Metrics" className="bg-white shadow-md rounded-2xl p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Average Mood Score</span>
                  <span className="font-semibold">{analytics?.wellnessMetrics?.averageMoodScore}/5</span>
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
                  <span className="font-semibold">{analytics?.wellnessMetrics?.engagementRate}%</span>
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
                  <span className="font-semibold">{analytics?.wellnessMetrics?.satisfactionScore}/5</span>
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
          <Card title="Quick Actions" className="bg-white shadow-md rounded-2xl p-6">
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 text-left rounded-xl transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 shadow-sm">
                <IconBarChart className="text-blue-600" size={22} />
                <div>
                  <p className="font-semibold text-blue-900">Generate Report</p>
                  <p className="text-sm text-blue-600">Weekly analytics</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 text-left rounded-xl transition-all duration-200 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 shadow-sm">
                <Users className="text-green-600" size={22} />
                <div>
                  <p className="font-semibold text-green-900">Manage Users</p>
                  <p className="text-sm text-green-600">User administration</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-3 p-4 text-left rounded-xl transition-all duration-200 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 shadow-sm">
                <Settings className="text-purple-600" size={22} />
                <div>
                  <p className="font-semibold text-purple-900">System Settings</p>
                  <p className="text-sm text-purple-600">Platform configuration</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Recent activity */}
          <Card title="Recent Activity" className="bg-white shadow-md rounded-2xl p-6">
            <div className="space-y-4 text-sm divide-y divide-gray-100">
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900 font-medium">New user registration</p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900 font-medium">Mood entry submitted</p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-gray-900 font-medium">Stress alert triggered</p>
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
