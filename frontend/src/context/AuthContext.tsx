import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Define types
interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

interface JwtPayload {
  id: number;
  sub: string;
  email: string;
  roles: string[];
  exp: number;
}

interface GoogleJwtPayload {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: (credential: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  clearError: () => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: false,
  error: null,
  login: async () => false,
  loginWithGoogle: async () => false,
  register: async () => false,
  logout: () => {},
  hasRole: () => false,
  clearError: () => {},
  isAuthenticated: false
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  
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
        const payload = jwtDecode<JwtPayload>(token);
        
        // Check if token is expired
        if (payload.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
        
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
  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const response = await axios.post('/api/auth/signin', { username, password });
      const { accessToken, id, email, roles } = response.data;
      
      // Save token and user data
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      setCurrentUser({
        id,
        username,
        email,
        roles
      });
      
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Google login function
  const loginWithGoogle = async (credential: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Send the Google credential to your backend
      const response = await axios.post('/api/auth/google', { credential });
      const { accessToken, id, email, username, roles } = response.data;
      
      // Save token and user data
      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      setCurrentUser({
        id,
        username,
        email,
        roles
      });
      
      return true;
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      await axios.post('/api/auth/signup', { username, email, password });
      
      // After registration, automatically log in the user
      return await login(username, password);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };
  
  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    if (!currentUser || !currentUser.roles) {
      return false;
    }
    return currentUser.roles.includes(role);
  };
  
  // Clear error
  const clearError = (): void => {
    setError(null);
  };
  
  // Context value
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    login,
    loginWithGoogle,
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