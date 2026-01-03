import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types/hrms';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (data: SignupData) => Promise<boolean>;
}

interface SignupData {
  employeeId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    email: 'admin@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    phone: '+1 (555) 123-4567',
    address: '123 Corporate Ave, Suite 100',
    joiningDate: '2020-03-15',
    salary: 85000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    email: 'employee@company.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'employee',
    department: 'Engineering',
    position: 'Software Developer',
    phone: '+1 (555) 987-6543',
    address: '456 Tech Street, Apt 201',
    joiningDate: '2022-06-01',
    salary: 75000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      employeeId: data.employeeId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      department: 'To be assigned',
      position: 'To be assigned',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: 0,
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
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
