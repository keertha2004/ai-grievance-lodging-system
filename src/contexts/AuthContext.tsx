import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for user and authentication context
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user data is in localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check if the user is authenticated
  const isAuthenticated = !!user;
  
  // Check if the user is an admin
  const isAdmin = user?.role === 'admin';

  // Login function - in a real app, this would make an API call to authenticate
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // This is a mock implementation. In a real app, this would be an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data - this would come from your API
      const mockUser: User = {
        id: '123',
        name: email === 'admin@example.com' ? 'Admin User' : 'Test User',
        email,
        role: email === 'admin@example.com' ? 'admin' : 'user'
      };
      
      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  // Register function - would make an API call to create a new user
  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data - this would come from your API after successful registration
      const mockUser: User = {
        id: '456',
        name,
        email,
        role: 'user'
      };
      
      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    }
  };

  // Logout function - clear user from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Provide the auth context values to children components
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}