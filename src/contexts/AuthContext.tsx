import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'lawyer' | 'client' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for each role
const DEMO_USERS: Record<UserRole, { email: string; password: string; user: User }> = {
  lawyer: {
    email: 'lawyer@demo.com',
    password: 'lawyer123',
    user: {
      id: 'lawyer-001',
      email: 'lawyer@demo.com',
      name: 'Advocate Rajesh Kumar',
      role: 'lawyer',
      avatar: undefined
    }
  },
  client: {
    email: 'client@demo.com',
    password: 'client123',
    user: {
      id: 'client-001',
      email: 'client@demo.com',
      name: 'Priya Sharma',
      role: 'client',
      avatar: undefined
    }
  },
  admin: {
    email: 'admin@demo.com',
    password: 'admin123',
    user: {
      id: 'admin-001',
      email: 'admin@demo.com',
      name: 'System Administrator',
      role: 'admin',
      avatar: undefined
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('legalease_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('legalease_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const demoUser = DEMO_USERS[role];
    
    if (email.toLowerCase() === demoUser.email && password === demoUser.password) {
      setUser(demoUser.user);
      localStorage.setItem('legalease_user', JSON.stringify(demoUser.user));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid credentials. Please use demo credentials.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('legalease_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
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
