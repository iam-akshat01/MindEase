import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import all pages
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DashboardStudent from '../pages/DashboardStudent';
import DashboardCounselor from '../pages/DashboardCounselor';
import DashboardAdmin from '../pages/DashboardAdmin';
import ChatAssistant from '../pages/ChatAssistant';
import Wellness from '../pages/Wellness';

/**
 * Protected route wrapper
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

/**
 * Role-based route wrapper
 * Redirects to appropriate dashboard based on user role
 */
const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const dashboardMap = {
      student: '/dashboard',
      counselor: '/dashboard', 
      admin: '/dashboard'
    };
    return <Navigate to={dashboardMap[userRole] || '/login'} replace />;
  }

  return children;
};

/**
 * Dashboard route wrapper
 * Renders appropriate dashboard based on user role
 */
const DashboardRoute = () => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  switch (userRole) {
    case 'student':
      return <DashboardStudent />;
    case 'counselor':
      return <DashboardCounselor />;
    case 'admin':
      return <DashboardAdmin />;
    default:
      return <Navigate to="/login" replace />;
  }
};

/**
 * Main application routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRoute />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatAssistant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wellness"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['student']}>
              <Wellness />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Counselor-specific routes */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['counselor']}>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Students Management</h2>
                <p className="text-gray-600">Detailed student management interface would go here</p>
              </div>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['counselor', 'admin']}>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h2>
                <p className="text-gray-600">Advanced analytics interface would go here</p>
              </div>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Admin-specific routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">User Management</h2>
                <p className="text-gray-600">User administration interface would go here</p>
              </div>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['admin']}>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h2>
                <p className="text-gray-600">Platform configuration interface would go here</p>
              </div>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Student-specific routes */}
      <Route
        path="/mood"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['student']}>
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Detailed Mood Tracker</h2>
                <p className="text-gray-600">Advanced mood tracking interface would go here</p>
              </div>
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 fallback */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-4">Page not found</p>
            <Navigate to="/dashboard" replace />
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;