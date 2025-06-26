import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthState, LoginCredentials } from "../types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  bypassLogin: () => void;
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("authUser");
        const savedDemoMode = localStorage.getItem("demoMode") === "true";

        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }

        if (savedDemoMode) {
          setIsDemoMode(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear invalid data
        localStorage.removeItem("authUser");
        localStorage.removeItem("demoMode");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Mock authentication - in production, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo credentials or any email/password combination for demo
      if (credentials.email === "demo@jobblox.com" || isDemoMode) {
        const userData: User = {
          id: "demo-user-123",
          email: credentials.email,
          name: "Demo User",
          role: "admin",
          permissions: [
            "view_dashboard",
            "manage_customers",
            "manage_jobs",
            "view_reports",
            "manage_team",
            "manage_finances",
            "admin_access",
            "manage_settings",
          ],
          status: "active",
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("authUser", JSON.stringify(userData));

        return true;
      }

      // For any other credentials, create a user (mock signup/login)
      const userData: User = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        name: credentials.email.split("@")[0],
        role: "manager",
        permissions: [
          "view_dashboard",
          "manage_customers",
          "manage_jobs",
          "view_reports",
        ],
        status: "active",
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("authUser", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const bypassLogin = () => {
    const userData: User = {
      id: "bypass-user",
      email: "demo@jobblox.com",
      name: "Demo User (Bypassed)",
      role: "admin",
      permissions: [
        "view_dashboard",
        "manage_customers",
        "manage_jobs",
        "view_reports",
        "manage_team",
        "manage_finances",
        "admin_access",
        "manage_settings",
      ],
      status: "active",
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setUser(userData);
    setIsAuthenticated(true);
    setIsDemoMode(true);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("demoMode", "true");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsDemoMode(false);
    localStorage.removeItem("authUser");
    localStorage.removeItem("demoMode");
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem("demoMode", "true");
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem("demoMode");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    bypassLogin,
    isDemoMode,
    enableDemoMode,
    disableDemoMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
