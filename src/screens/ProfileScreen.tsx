import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    phoneNumber: user?.profile?.phoneNumber || '',
    dateOfBirth: user?.profile?.dateOfBirth || '',
    preferences: {
      notifications: user?.profile?.preferences.notifications || false,
      newsletter: user?.profile?.preferences.newsletter || false,
      theme: user?.profile?.preferences.theme || 'light',
      language: user?.profile?.preferences.language || 'en',
    },
  });

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      bio: user?.profile?.bio || '',
      location: user?.profile?.location || '',
      website: user?.profile?.website || '',
      phoneNumber: user?.profile?.phoneNumber || '',
      dateOfBirth: user?.profile?.dateOfBirth || '',
      preferences: {
        notifications: user?.profile?.preferences.notifications || false,
        newsletter: user?.profile?.preferences.newsletter || false,
        theme: user?.profile?.preferences.theme || 'light',
        language: user?.profile?.preferences.language || 'en',
      },
    });
    setIsEditing(false);
  };

  const renderField = (label: string, value: string) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, [label.toLowerCase()]: text }))
          }
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.value}>{value || 'Not set'}</Text>
      )}
    </View>
  );

  const renderPreferenceSwitch = (label: string, key: 'notifications' | 'newsletter') => (
    <View style={styles.switchContainer}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={formData.preferences[key]}
        onValueChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            preferences: { ...prev.preferences, [key]: value },
          }))
        }
        disabled={!isEditing}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
        {isEditing && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        {renderField('Bio', formData.bio)}
        {renderField('Location', formData.location)}
        {renderField('Website', formData.website)}
        {renderField('Phone Number', formData.phoneNumber)}
        {renderField('Date of Birth', formData.dateOfBirth)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderPreferenceSwitch('Notifications', 'notifications')}
        {renderPreferenceSwitch('Newsletter', 'newsletter')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.OS === 'web' ? 8 : 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});
