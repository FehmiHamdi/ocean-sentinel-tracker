import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock user types
export type UserRole = 'admin' | 'volunteer';

export interface User {
  id: string;
  username: string;
  email?: string;
  role: UserRole;
}

export interface Volunteer {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVolunteer: boolean;
  volunteers: Volunteer[];
  login: (username: string, password: string, role: UserRole) => { success: boolean; error?: string };
  register: (username: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '123456',
};

// Storage keys
const AUTH_USER_KEY = 'turtle_track_user';
const VOLUNTEERS_KEY = 'turtle_track_volunteers';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  // Load persisted state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    const savedVolunteers = localStorage.getItem(VOLUNTEERS_KEY);
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedVolunteers) {
      setVolunteers(JSON.parse(savedVolunteers));
    }
  }, []);

  // Persist volunteers when they change
  useEffect(() => {
    if (volunteers.length > 0) {
      localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers));
    }
  }, [volunteers]);

  const login = (username: string, password: string, role: UserRole): { success: boolean; error?: string } => {
    if (role === 'admin') {
      // Admin login
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const adminUser: User = {
          id: 'admin-1',
          username: 'admin',
          role: 'admin',
        };
        setUser(adminUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(adminUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials' };
    } else {
      // Volunteer login
      const volunteer = volunteers.find(
        (v) => v.username === username && v.password === password
      );
      if (volunteer) {
        const volunteerUser: User = {
          id: volunteer.id,
          username: volunteer.username,
          email: volunteer.email,
          role: 'volunteer',
        };
        setUser(volunteerUser);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(volunteerUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const register = (username: string, email: string, password: string): { success: boolean; error?: string } => {
    // Check if username or email already exists
    const existingVolunteer = volunteers.find(
      (v) => v.username === username || v.email === email
    );
    if (existingVolunteer) {
      return { success: false, error: 'Username or email already exists' };
    }

    // Create new volunteer
    const newVolunteer: Volunteer = {
      id: `volunteer-${Date.now()}`,
      username,
      email,
      password,
    };
    
    const updatedVolunteers = [...volunteers, newVolunteer];
    setVolunteers(updatedVolunteers);
    localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(updatedVolunteers));

    // Auto-login after registration
    const volunteerUser: User = {
      id: newVolunteer.id,
      username: newVolunteer.username,
      email: newVolunteer.email,
      role: 'volunteer',
    };
    setUser(volunteerUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(volunteerUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isVolunteer: user?.role === 'volunteer',
        volunteers,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
