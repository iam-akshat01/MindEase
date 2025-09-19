import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  MessageCircle,
  Activity,
  Heart,
  Users,
  BarChart,
  Settings,
  X
} from 'lucide-react';

/**
 * Sidebar navigation component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether sidebar is open (mobile)
 * @param {function} props.onClose - Close handler for mobile
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { getUserRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getUserRole();

  // Navigation items based on user role
  const navigationItems = {
    student: [
      { path: '/dashboard', label: 'Dashboard', icon: Home },
      { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
      { path: '/wellness', label: 'Wellness', icon: Heart },
      { path: '/mood', label: 'Mood Tracker', icon: Activity },
    ],
    counselor: [
      { path: '/dashboard', label: 'Dashboard', icon: Home },
      { path: '/students', label: 'Students', icon: Users },
      { path: '/analytics', label: 'Analytics', icon: BarChart },
      { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
    ],
    admin: [
      { path: '/dashboard', label: 'Dashboard', icon: Home },
      { path: '/analytics', label: 'Analytics', icon: BarChart },
      { path: '/users', label: 'User Management', icon: Users },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  };

  const navItems = navigationItems[userRole] || navigationItems.student;

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose(); // Close mobile sidebar after navigation
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 lg:py-8">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    text-left transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role indicator */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="px-4 py-2 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {userRole} Portal
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;