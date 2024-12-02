import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError('');
    setError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setError('');
      setEmailError('');

      // Validate email format
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }

      // Validate required fields
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onKeyPress={handleKeyPress}
          autoComplete="current-password"
        />
        <Pressable onPress={toggleShowPassword} style={styles.showPasswordButton}>
          <Text style={styles.showPasswordText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </Pressable>
      </View>
      
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      
      <Pressable onPress={() => navigate('/signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 10,
    position: 'relative',
  },
  input: {
    width: '100%',
    maxWidth: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  passwordInput: {
    paddingRight: 50, // Make room for the show/hide button
  },
  inputError: {
    borderColor: '#ff4444',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 8,
    padding: 4,
  },
  showPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    width: '100%',
    maxWidth: 300,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
  link: {
    color: '#007AFF',
    marginTop: 20,
  },
});
