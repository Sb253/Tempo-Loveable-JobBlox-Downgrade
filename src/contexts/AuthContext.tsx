
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials } from '../types/auth';
import { defaultDemoConfig } from '../types/demo';
import { useToast } from '../hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for demo mode setting
    const demoMode = localStorage.getItem('demoMode') === 'true';
    const savedUser = localStorage.getItem('authUser');
    
    if (demoMode || defaultDemoConfig.enabled) {
      setIsDemoMode(true);
      if (defaultDemoConfig.autoLogin) {
        setUser(defaultDemoConfig.demoUser);
        setIsAuthenticated(true);
        localStorage.setItem('authUser', JSON.stringify(defaultDemoConfig.demoUser));
      }
    } else if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authUser');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combination
      // In production, this would make an actual API call
      if (isDemoMode || credentials.email === 'demo@jobblox.com') {
        const userData = defaultDemoConfig.demoUser;
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authUser', JSON.stringify(userData));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.name}!`,
        });
        
        return true;
      }
      
      // Mock validation for other credentials
      if (credentials.email && credentials.password) {
        const userData: User = {
          id: 'user-' + Date.now(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'admin',
          permissions: ['view_dashboard', 'manage_customers', 'manage_jobs', 'view_reports'],
          status: 'active',
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authUser', JSON.stringify(userData));
        
        toast({
          title: "Login Successful",
          description: `Welcome, ${userData.name}!`,
        });
        
        return true;
      }
      
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('demoMode', 'true');
    if (defaultDemoConfig.autoLogin) {
      setUser(defaultDemoConfig.demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('authUser', JSON.stringify(defaultDemoConfig.demoUser));
    }
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem('demoMode');
    logout();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    isDemoMode,
    enableDemoMode,
    disableDemoMode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
