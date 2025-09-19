import React from 'react';

/**
 * Reusable card component with consistent styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onClick - Click handler for clickable cards
 */
const Card = ({
  children,
  title,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = `
    bg-white rounded-xl shadow-sm border border-gray-200
    transition-all duration-200
    ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-1' : ''}
  `;

  return (
    <div
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>
      )}
      
      <div className={title ? 'p-6' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

// Specialized card components
export const StatsCard = ({ title, value, change, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    yellow: 'text-yellow-600 bg-yellow-100',
    red: 'text-red-600 bg-red-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              change.startsWith('+') ? 'text-green-600' : 
              change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;