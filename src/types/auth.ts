export interface UserProfile {
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  profile?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}
