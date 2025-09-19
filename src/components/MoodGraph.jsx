import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Mood tracking graph component
 * @param {Object} props - Component props
 * @param {Array} props.data - Mood data array
 * @param {number} props.height - Chart height (default: 300)
 */
const MoodGraph = ({ data = [], height = 300 }) => {
  // Transform data for the chart
  const chartData = data.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    mood: entry.mood,
    energy: entry.energy,
    stress: entry.stress
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm`} style={{ color: entry.color }}>
              {entry.name === 'mood' && 'Mood: '}
              {entry.name === 'energy' && 'Energy: '}
              {entry.name === 'stress' && 'Stress: '}
              {entry.value}/5
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Mood level labels for better UX
  const getMoodLabel = (value) => {
    const labels = {
      1: 'Very Low',
      2: 'Low',
      3: 'Neutral',
      4: 'Good',
      5: 'Excellent'
    };
    return labels[value] || '';
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          7-Day Mood Tracking
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-600">Mood</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-gray-600">Stress</span>
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis 
              domain={[1, 5]}
              tick={{ fontSize: 12 }}
              stroke="#666"
              tickFormatter={(value) => getMoodLabel(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="mood"
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              name="energy"
            />
            <Line
              type="monotone"
              dataKey="stress"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
              name="stress"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 mb-2">No mood data available</p>
            <p className="text-sm text-gray-400">Start tracking your mood to see trends</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodGraph;