import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType, UserProfile } from '../types/auth';
import { profileService } from '../services/profileService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: Record<string, User> = {
  'test@example.com': {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Load user profile
      loadUserProfile(parsedUser.id);
    }
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await profileService.getUserProfile(userId);
      if (profile && user) {
        setUser({ ...user, profile });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser = mockUsers[email];
    if (!mockUser) {
      throw new Error('Invalid credentials');
    }

    // Load user profile
    const profile = await profileService.getUserProfile(mockUser.id);
    const userWithProfile = { ...mockUser, profile };

    setUser(userWithProfile);
    localStorage.setItem('user', JSON.stringify(userWithProfile));
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (mockUsers[email]) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers[email] = newUser;

    // Create default profile
    await profileService.updateUserProfile(newUser.id, {
      preferences: {
        notifications: true,
        newsletter: false,
        theme: 'light',
        language: 'en',
      },
    });

    const profile = await profileService.getUserProfile(newUser.id);
    const userWithProfile = { ...newUser, profile };

    setUser(userWithProfile);
    localStorage.setItem('user', JSON.stringify(userWithProfile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    mockUsers[user.email] = updatedUser;
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    const updatedProfile = await profileService.updateUserProfile(user.id, updates);
    const updatedUser = { ...user, profile: updatedProfile, updatedAt: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        updateUserProfile,
      }}
    >
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
