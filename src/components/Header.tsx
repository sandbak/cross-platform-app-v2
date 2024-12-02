import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Dimensions, Animated } from 'react-native';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(Dimensions.get('window').width < 768);
    };

    checkMobile();
    if (Platform.OS === 'web') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      // Animate menu opening
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Animate menu closing
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.logo}>My App</Text>
        </View>

        <View style={[
          styles.rightSection,
          isMobile && {
            flexDirection: 'column',
            position: 'absolute',
            right: 15,
            top: '50%',
            transform: [{ translateY: -20 }],
          }
        ]}>
          {user && !isMobile && (
            <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
          )}

          {isMobile ? (
            <>
              <Pressable onPress={toggleMenu} style={[styles.menuButton, { width: isMobile ? 44 : 'auto' }]}>
                <Text style={styles.menuButtonText}>☰</Text>
              </Pressable>
            </>
          ) : (
            <>
              {user ? (
                <>
                  <Pressable
                    onPress={() => handleNavigation('/')}
                    style={({ pressed }) => [
                      styles.navButton,
                      location.pathname === '/' && styles.activeNavButton,
                      pressed && styles.pressedNavButton,
                    ]}
                  >
                    <Text style={styles.navButtonText}>Home</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleNavigation('/details')}
                    style={({ pressed }) => [
                      styles.navButton,
                      location.pathname === '/details' && styles.activeNavButton,
                      pressed && styles.pressedNavButton,
                    ]}
                  >
                    <Text style={styles.navButtonText}>Details</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleNavigation('/profile')}
                    style={({ pressed }) => [
                      styles.navButton,
                      location.pathname === '/profile' && styles.activeNavButton,
                      pressed && styles.pressedNavButton,
                    ]}
                  >
                    <Text style={styles.navButtonText}>Profile</Text>
                  </Pressable>
                  <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable onPress={() => navigate('/login')} style={styles.loginButton}>
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              )}
            </>
          )}
        </View>

        {isMobile && (
          <Animated.View 
            style={[
              styles.overlay,
              {
                opacity: fadeAnim,
                pointerEvents: menuOpen ? 'auto' : 'none',
                display: menuOpen ? 'flex' : 'none',
              },
            ]}
          >
            <View style={styles.overlayTouchable}>
              <Pressable 
                style={styles.overlayPressable}
                onPress={() => setMenuOpen(false)}
              >
                <Animated.View 
                  style={[
                    styles.mobileNav,
                    {
                      transform: [{
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [300, 0],
                        }),
                      }],
                    },
                  ]}
                >
                  <View style={styles.mobileNavContent}>
                    {user && (
                      <View style={styles.mobileUserInfo}>
                        <Text style={styles.mobileWelcomeText}>Welcome, {user.name}</Text>
                      </View>
                    )}
                    <View style={styles.mobileNavLinks}>
                      {user ? (
                        <>
                          <Pressable
                            onPress={() => handleNavigation('/')}
                            style={({ pressed }) => [
                              styles.mobileLink,
                              location.pathname === '/' && styles.activeMobileLink,
                              pressed && styles.pressedMobileLink,
                            ]}
                          >
                            <Text style={styles.mobileLinkText}>Home</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => handleNavigation('/details')}
                            style={({ pressed }) => [
                              styles.mobileLink,
                              location.pathname === '/details' && styles.activeMobileLink,
                              pressed && styles.pressedMobileLink,
                            ]}
                          >
                            <Text style={styles.mobileLinkText}>Details</Text>
                          </Pressable>
                          <Pressable
                            onPress={() => handleNavigation('/profile')}
                            style={({ pressed }) => [
                              styles.mobileLink,
                              location.pathname === '/profile' && styles.activeMobileLink,
                              pressed && styles.pressedMobileLink,
                            ]}
                          >
                            <Text style={styles.mobileLinkText}>Profile</Text>
                          </Pressable>
                          <Pressable
                            onPress={handleLogout}
                            style={({ pressed }) => [
                              styles.mobileLink,
                              styles.mobileLogoutLink,
                              pressed && styles.pressedMobileLink,
                            ]}
                          >
                            <Text style={[styles.mobileLinkText, styles.mobileLogoutText]}>
                              Logout
                            </Text>
                          </Pressable>
                        </>
                      ) : (
                        <Pressable
                          onPress={() => handleNavigation('/login')}
                          style={({ pressed }) => [
                            styles.mobileLink,
                            styles.mobileLoginLink,
                            pressed && styles.pressedMobileLink,
                          ]}
                        >
                          <Text style={[styles.mobileLinkText, styles.mobileLoginText]}>
                            Login
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Animated.View>
              </Pressable>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    padding: 15,
    ...(Platform.OS === 'web' ? {
      position: 'relative',
      zIndex: 1000,
    } : {}),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  welcomeText: {
    marginRight: 10,
    color: '#666',
  },
  menuButton: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 24,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    minHeight: Dimensions.get('window').height,
    ...(Platform.OS === 'web' ? {
      position: 'absolute',
    } : {}),
  },
  overlayTouchable: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  overlayPressable: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  mobileNav: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#fff',
    minHeight: Dimensions.get('window').height,
    ...(Platform.OS === 'web' ? {
      boxShadow: '-2px 0 4px rgba(0,0,0,0.1)',
    } : {}),
  },
  mobileNavContent: {
    padding: 20,
    flex: 1,
    minHeight: Dimensions.get('window').height,
    flexDirection: 'column',
    ...(Platform.OS === 'web' ? {
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
    } : {
      overflow: 'scroll',
    }),
  },
  mobileUserInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  mobileWelcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mobileNavLinks: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
  },
  mobileLink: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
    } : {}),
  },
  activeMobileLink: {
    backgroundColor: '#e6f2ff',
  },
  pressedMobileLink: {
    opacity: 0.7,
  },
  mobileLinkText: {
    fontSize: 16,
    color: '#007AFF',
  },
  mobileLogoutLink: {
    marginTop: 20,
    backgroundColor: '#ffebeb',
  },
  mobileLoginLink: {
    backgroundColor: '#007AFF',
  },
  mobileLogoutText: {
    color: '#ff3b30',
  },
  mobileLoginText: {
    color: '#fff',
  },
  navButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
    } : {}),
  },
  activeNavButton: {
    backgroundColor: '#e6f2ff',
  },
  pressedNavButton: {
    opacity: 0.7,
  },
  navButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: 80,
    ...(Platform.OS === 'web' ? {
      transition: 'opacity 0.2s ease-in-out',
      cursor: 'pointer',
    } : {}),
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 4,
    ...(Platform.OS === 'web' ? {
      transition: 'opacity 0.2s ease-in-out',
      cursor: 'pointer',
    } : {}),
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
});
