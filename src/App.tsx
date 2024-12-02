import { View, StyleSheet } from 'react-native';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomeScreen } from './screens/HomeScreen';
import { DetailsScreen } from './screens/DetailsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Header } from './components/Header';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <View style={styles.container}>
      {isAuthenticated && <Header />}
      <View style={styles.content}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <DetailsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
