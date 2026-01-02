import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  softwareBackgroundLevel: string;
  hardwareBackgroundLevel: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, name: string, softwareBackgroundLevel: string, hardwareBackgroundLevel: string) => Promise<void>;
  getSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check session on initial load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
        const response = await fetch(`${API_BASE_URL}/session`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, softwareBackgroundLevel: string, hardwareBackgroundLevel: string) => {
    setLoading(true);
    try {
      const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          softwareBackgroundLevel,
          hardwareBackgroundLevel
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
      await fetch(`${API_BASE_URL}/signout`, { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getSession = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_BETTER_AUTH_API_URL || '/api/auth';
      const response = await fetch(`${API_BASE_URL}/session`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return data;
      }
    } catch (error) {
      console.error('Get session error:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    signUp,
    getSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};