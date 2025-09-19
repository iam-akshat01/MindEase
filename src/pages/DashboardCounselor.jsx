import React, { useState, useEffect } from 'react';
import { getCounselorData } from '../services/surveyService';
import Card, { StatsCard } from '../components/Card';
import { 
  Users, 
  AlertTriangle, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye
} from 'lucide-react';

/**
 * Counselor dashboard for monitoring student wellness
 */
const DashboardCounselor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadCounselorData();
  }, []);

  const loadCounselorData = async () => {
    try {
      const counselorData = await getCounselorData();
      setData(counselorData);
    } catch (error) {
      console.error('Failed to load counselor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="text-red-500" size={16} />;
      case 'medium': return <TrendingDown className="text-yellow-500" size={16} />;
      default: return <TrendingUp className="text-blue-500" size={16} />;
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
          Counselor Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor student wellness and provide timely support
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Students"
          value={data?.assignedStudents?.length || 0}
          icon={<Users size={20} />}
          color="blue"
        />
        <StatsCard
          title="Weekly Check-ins"
          value={data?.weeklyStats?.totalCheckIns || 0}
          change="+12 from last week"
          icon={<Calendar size={20} />}
          color="green"
        />
        <StatsCard
          title="Average Mood"
          value={data?.weeklyStats?.averageMood?.toFixed(1) || '0.0'}
          change="Stable"
          icon={<TrendingUp size={20} />}
          color="purple"
        />
        <StatsCard
          title="Need Attention"
          value={data?.weeklyStats?.studentsNeedingAttention || 0}
          icon={<AlertTriangle size={20} />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Students list */}
        <div className="lg:col-span-2">
          <Card title="Assigned Students">
            <div className="space-y-4">
              {data?.assignedStudents?.map((student) => (
                <div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(student.riskLevel)}`}>
                      {student.riskLevel} risk
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Avg Mood:</span>
                      <span className="ml-1 font-medium">{student.averageMood}/5</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Entry:</span>
                      <span className="ml-1 font-medium">
                        {new Date(student.lastMoodEntry).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Contact:</span>
                      <span className="ml-1 font-medium">
                        {new Date(student.lastContact).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent alerts */}
          <Card title="Recent Alerts">
            <div className="space-y-3">
              {data?.recentAlerts?.map((alert) => (
                <div
                  key={alert.id}
                  className="border-l-4 border-red-400 bg-red-50 p-3 rounded-r-lg"
                >
                  <div className="flex items-start space-x-2">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">
                        {alert.type}
                      </h5>
                      <p className="text-sm text-gray-600 mb-1">
                        {alert.studentName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {alert.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(alert.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick actions */}
          <Card title="Quick Actions">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <MessageSquare className="text-blue-600" size={20} />
                <div>
                  <p className="font-medium text-blue-900">Send Check-in</p>
                  <p className="text-sm text-blue-600">To all students</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Calendar className="text-green-600" size={20} />
                <div>
                  <p className="font-medium text-green-900">Schedule Session</p>
                  <p className="text-sm text-green-600">Book counseling</p>
                </div>
              </button>
            </div>
          </Card>

          {/* Weekly summary */}
          <Card title="This Week's Summary">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Sessions:</span>
                <span className="font-medium">{data?.weeklyStats?.completedSessions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate:</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Students:</span>
                <span className="font-medium">{data?.assignedStudents?.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardCounselor;