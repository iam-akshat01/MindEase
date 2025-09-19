// Mock mood tracking service - Frontend only implementation

/**
 * Gets mock mood data for the current user
 * @param {number} userId - User ID
 * @param {number} days - Number of days to retrieve (default: 7)
 * @returns {Promise<Array>} Array of mood entries
 */
export const getMoodData = async (userId, days = 7) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Generate mock mood data for the last 7 days
  const moodData = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    moodData.push({
      id: Date.now() + i,
      date: date.toISOString().split('T')[0],
      mood: Math.floor(Math.random() * 5) + 1, // 1-5 scale
      notes: i === 0 ? 'Feeling optimistic today!' : '',
      energy: Math.floor(Math.random() * 5) + 1,
      sleep: Math.floor(Math.random() * 10) + 4, // 4-14 hours
      stress: Math.floor(Math.random() * 5) + 1
    });
  }

  return moodData;
};

/**
 * Saves a new mood entry
 * @param {Object} moodEntry - Mood data to save
 * @returns {Promise<Object>} Saved mood entry
 */
export const saveMoodEntry = async (moodEntry) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock saving the mood entry
  return {
    id: Date.now(),
    ...moodEntry,
    createdAt: new Date().toISOString()
  };
};

/**
 * Gets mood analytics for counselors/admins
 * @param {string} timeframe - 'week', 'month', 'quarter'
 * @returns {Promise<Object>} Mood analytics data
 */
export const getMoodAnalytics = async (timeframe = 'week') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  return {
    averageMood: 3.2,
    totalEntries: 156,
    stressAlerts: 12,
    improvementTrend: '+15%',
    moodDistribution: {
      veryHappy: 23,
      happy: 45,
      neutral: 67,
      sad: 18,
      verySad: 3
    },
    weeklyTrends: [
      { day: 'Mon', avgMood: 3.1, entries: 23 },
      { day: 'Tue', avgMood: 3.3, entries: 28 },
      { day: 'Wed', avgMood: 2.9, entries: 19 },
      { day: 'Thu', avgMood: 3.4, entries: 31 },
      { day: 'Fri', avgMood: 3.8, entries: 35 },
      { day: 'Sat', avgMood: 4.1, entries: 12 },
      { day: 'Sun', avgMood: 3.6, entries: 8 }
    ]
  };
};