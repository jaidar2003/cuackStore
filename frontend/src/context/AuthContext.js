import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const navigate = useNavigate();
  
  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  
  // Check if user is already logged in on app load
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // In a real app, this would be an API call to get user data
        // const response = await axios.get('/api/auth/user');
        // setCurrentUser(response.data);
        
        // For now, we'll decode the JWT to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({
          id: payload.id,
          username: payload.sub,
          email: payload.email,
          roles: payload.roles
        });
        setError(null);
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        setToken(null);
        setCurrentUser(null);
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [token]);
  
  // Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/signin', { username, password });
      // const { accessToken, id, email, roles } = response.data;
      
      // Mock implementation for development
      // This simulates a successful login with a mock JWT
      if (username === 'admin' && password === 'admin123') {
        // Create a mock JWT payload
        const payload = {
          id: 1,
          sub: 'admin',
          email: 'admin@cuakstore.com',
          roles: ['ROLE_ADMIN']
        };
        
        // Create a mock JWT (not a real JWT, just for demonstration)
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payloadStr = btoa(JSON.stringify(payload));
        const signature = btoa('signature'); // Not a real signature
        const mockToken = `${header}.${payloadStr}.${signature}`;
        
        // Save token and user data
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setCurrentUser({
          id: payload.id,
          username: payload.sub,
          email: payload.email,
          roles: payload.roles
        });
        
        return true;
      } else if (username === 'owner' && password === 'owner123') {
        // Create a mock JWT payload for owner
        const payload = {
          id: 2,
          sub: 'owner',
          email: 'owner@cuakstore.com',
          roles: ['ROLE_OWNER']
        };
        
        // Create a mock JWT
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payloadStr = btoa(JSON.stringify(payload));
        const signature = btoa('signature');
        const mockToken = `${header}.${payloadStr}.${signature}`;
        
        // Save token and user data
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setCurrentUser({
          id: payload.id,
          username: payload.sub,
          email: payload.email,
          roles: payload.roles
        });
        
        return true;
      } else if (username === 'user' && password === 'user123') {
        // Create a mock JWT payload for regular user
        const payload = {
          id: 3,
          sub: 'user',
          email: 'user@example.com',
          roles: ['ROLE_USER']
        };
        
        // Create a mock JWT
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payloadStr = btoa(JSON.stringify(payload));
        const signature = btoa('signature');
        const mockToken = `${header}.${payloadStr}.${signature}`;
        
        // Save token and user data
        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setCurrentUser({
          id: payload.id,
          username: payload.sub,
          email: payload.email,
          roles: payload.roles
        });
        
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/auth/signup', { username, email, password });
      
      // Mock implementation for development
      // This simulates a successful registration
      if (username && email && password) {
        // In a real app, we would get a success message from the API
        // For now, we'll just simulate a successful registration
        
        // After registration, automatically log in the user
        return await login(username, password);
      } else {
        setError('Please fill in all required fields');
        return false;
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };
  
  // Check if user has a specific role
  const hasRole = (role) => {
    if (!currentUser || !currentUser.roles) {
      return false;
    }
    return currentUser.roles.includes(role);
  };
  
  // Clear error
  const clearError = () => {
    setError(null);
  };
  
  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
    clearError,
    isAuthenticated: !!currentUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;