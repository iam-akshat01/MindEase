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
        fixed top-0 left-0 h-full w-64 
        bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-700 text-white
        z-50 shadow-xl
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none rounded-2xl 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 '}
       `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
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
                      ? 'bg-white/20 text-white font-semibold' 
                      : 'hover:bg-white/10 text-white/80 hover:text-white'
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
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="px-4 py-2 bg-white/10 rounded-lg">
              <p className="text-xs font-medium text-white/80 uppercase tracking-wide">
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
