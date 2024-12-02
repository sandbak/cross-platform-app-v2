import { User, UserProfile } from '../types/auth';

// Mock database for user profiles
const mockUserProfiles: Record<string, UserProfile> = {
  'test-user-id': {
    bio: 'Software developer passionate about React Native',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    phoneNumber: '+1234567890',
    dateOfBirth: '1990-01-01',
    preferences: {
      notifications: true,
      newsletter: true,
      theme: 'light',
      language: 'en',
    },
  },
};

export const profileService = {
  // Get user profile
  getUserProfile: async (userId: string): Promise<UserProfile | undefined> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUserProfiles[userId];
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentProfile = mockUserProfiles[userId] || {
      preferences: {
        notifications: true,
        newsletter: false,
        theme: 'light' as const,
        language: 'en',
      },
    };

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      preferences: {
        ...currentProfile.preferences,
        ...(updates.preferences || {}),
      },
    };

    // Update mock database
    mockUserProfiles[userId] = updatedProfile;

    return updatedProfile;
  },

  // Delete user profile
  deleteUserProfile: async (userId: string): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    delete mockUserProfiles[userId];
  },

  // Update user preferences
  updateUserPreferences: async (
    userId: string,
    preferences: Partial<UserProfile['preferences']>
  ): Promise<UserProfile['preferences']> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentProfile = mockUserProfiles[userId];
    if (!currentProfile) {
      throw new Error('User profile not found');
    }

    const updatedPreferences = {
      ...currentProfile.preferences,
      ...preferences,
    };

    mockUserProfiles[userId] = {
      ...currentProfile,
      preferences: updatedPreferences,
    };

    return updatedPreferences;
  },
};
