// Mock survey and analytics service - Frontend only implementation

/**
 * Gets wellness survey questions
 * @returns {Promise<Array>} Array of survey questions
 */
export const getWellnessSurvey = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      question: "How would you rate your overall mental wellness this week?",
      type: "scale",
      scale: { min: 1, max: 5, labels: ["Very Poor", "Poor", "Fair", "Good", "Excellent"] }
    },
    {
      id: 2,
      question: "Which of the following have been sources of stress for you recently?",
      type: "multiselect",
      options: ["Academic work", "Social relationships", "Financial concerns", "Family issues", "Health concerns", "Future uncertainty"]
    },
    {
      id: 3,
      question: "How often have you engaged in self-care activities this week?",
      type: "radio",
      options: ["Never", "Rarely", "Sometimes", "Often", "Daily"]
    },
    {
      id: 4,
      question: "What wellness resources would be most helpful to you?",
      type: "multiselect",
      options: ["Counseling services", "Stress management workshops", "Meditation resources", "Peer support groups", "Mental health apps", "Exercise programs"]
    }
  ];
};

/**
 * Submits survey responses
 * @param {Object} responses - Survey responses
 * @returns {Promise<Object>} Submission confirmation
 */
export const submitSurveyResponse = async (responses) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: Date.now(),
    submitted: true,
    message: "Thank you for your feedback! Your responses help us improve our services."
  };
};

/**
 * Gets platform analytics (for admin dashboard)
 * @returns {Promise<Object>} Analytics data
 */
export const getPlatformAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  return {
    totalUsers: 1247,
    activeUsers: 892,
    moodEntries: 3456,
    chatSessions: 567,
    stressAlerts: 23,
    userGrowth: [
      { month: 'Jan', users: 234 },
      { month: 'Feb', users: 345 },
      { month: 'Mar', users: 456 },
      { month: 'Apr', users: 678 },
      { month: 'May', users: 823 },
      { month: 'Jun', users: 1247 }
    ],
    wellnessMetrics: {
      averageMoodScore: 3.4,
      engagementRate: 76,
      satisfactionScore: 4.2
    },
    topStressors: [
      { category: "Academic Pressure", count: 456 },
      { category: "Social Anxiety", count: 234 },
      { category: "Financial Stress", count: 189 },
      { category: "Family Issues", count: 156 },
      { category: "Health Concerns", count: 123 }
    ]
  };
};

/**
 * Gets counselor dashboard data
 * @returns {Promise<Object>} Counselor-specific data
 */
export const getCounselorData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    assignedStudents: [
      { 
        id: 1, 
        name: "Sarah Martinez", 
        email: "sarah.m@university.edu",
        lastMoodEntry: "2024-01-15",
        averageMood: 2.8,
        riskLevel: "medium",
        lastContact: "2024-01-14"
      },
      { 
        id: 2, 
        name: "James Wilson", 
        email: "j.wilson@university.edu",
        lastMoodEntry: "2024-01-15",
        averageMood: 3.5,
        riskLevel: "low",
        lastContact: "2024-01-12"
      },
      { 
        id: 3, 
        name: "Emily Chen", 
        email: "e.chen@university.edu",
        lastMoodEntry: "2024-01-14",
        averageMood: 2.1,
        riskLevel: "high",
        lastContact: "2024-01-15"
      }
    ],
    recentAlerts: [
      {
        id: 1,
        studentName: "Emily Chen",
        type: "Low Mood Pattern",
        severity: "high",
        date: "2024-01-15",
        description: "Consecutive days of mood ratings below 3"
      },
      {
        id: 2,
        studentName: "Michael Roberts",
        type: "Missed Check-ins",
        severity: "medium",
        date: "2024-01-14",
        description: "No mood entries for 5 days"
      }
    ],
    weeklyStats: {
      totalCheckIns: 89,
      averageMood: 3.2,
      studentsNeedingAttention: 5,
      completedSessions: 12
    }
  };
};