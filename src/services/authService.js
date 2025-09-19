// Mock authentication service - Frontend only implementation
// In a real app, these would make HTTP requests to your backend

/**
 * Simulates user login with dummy data
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {string} credentials.role - User role (student/counselor/admin)
 * @returns {Promise<Object>} Mock user data
 */
export const loginUser = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { email, password, role } = credentials;

  // Mock user database
  const mockUsers = {
    'student@example.com': {
      id: 1,
      email: 'student@example.com',
      name: 'Alex Johnson',
      role: 'student',
      avatar: '/api/placeholder/150/150'
    },
    'counselor@example.com': {
      id: 2,
      email: 'counselor@example.com',
      name: 'Dr. Sarah Wilson',
      role: 'counselor',
      avatar: '/api/placeholder/150/150'
    },
    'admin@example.com': {
      id: 3,
      email: 'admin@example.com',
      name: 'Michael Chen',
      role: 'admin',
      avatar: '/api/placeholder/150/150'
    }
  };

  // Simple validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = mockUsers[email];
  if (!user || user.role !== role) {
    throw new Error('Invalid credentials or role');
  }

  // Return mock user data with token
  return {
    ...user,
    token: 'mock-jwt-token-' + Date.now()
  };
};

/**
 * Simulates user registration
 * @param {Object} userData - New user data
 * @returns {Promise<Object>} Mock created user
 */
export const signupUser = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { email, password, name } = userData;

  // Simple validation
  if (!email || !password || !name) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Simulate successful registration
  return {
    id: Date.now(),
    email,
    name,
    role: 'student',
    avatar: '/api/placeholder/150/150',
    token: 'mock-jwt-token-' + Date.now()
  };
};

/**
 * Simulates user logout
 * @returns {Promise<boolean>} Success status
 */
export const logoutUser = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};