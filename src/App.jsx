import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

/**
 * Main layout component that wraps authenticated routes
 */
const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show layout for unauthenticated users
  if (!isAuthenticated()) {
    return (
      <div
        className="min-h-screen flex items-center justify-center 
          bg-gradient-radial from-purple-100 via-white to-blue-100 
          dark:from-gray-900 dark:via-gray-800 dark:to-black 
          transition-colors duration-500"
      >
        <div className="p-6 w-full max-w-md rounded-2xl shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <AppRoutes />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col 
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        dark:from-gray-950 dark:via-gray-900 dark:to-black
        transition-colors duration-500 gap-y-3"
    >
      {/* Navbar */}
      <div
        className="sticky top-0 z-50 shadow-md 
        bg-white/80 dark:bg-gray-900/80 
        backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/50"
      >
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Sidebar + Content */}
      <div className="flex ">
        <div className="flex flex-1 gap-x-3 ">
        {/* Single Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div
          className="flex-1 min-h-screen 
            px-4 sm:px-6 md:px-8 lg:px-10 py-6
            transition-all duration-300 ease-in-out 
            bg-white/80 dark:bg-gray-900/80 
            backdrop-blur-xl rounded-t-2xl shadow-inner"
        >
          <AppRoutes />
        </div>

      </div>
      
      </div>
    </div>
  );
};

/**
 * Root App component
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
};

export default App;
