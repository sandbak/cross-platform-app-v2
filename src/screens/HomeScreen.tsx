import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';

export const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your App</Text>
      
      <Card>
        <Text style={styles.cardTitle}>Getting Started</Text>
        <Text style={styles.cardText}>
          This is a cross-platform app built with React Native Web.
          It works on web, iOS, and Android with the same codebase!
        </Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Go to Details" 
            onPress={() => navigate('/details')} 
          />
          <View style={styles.buttonSpacing} />
          <Button 
            title="Learn More" 
            variant="secondary"
            onPress={() => alert('Secondary button pressed!')} 
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    width: '100%',
    marginHorizontal: 'auto',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  buttonSpacing: {
    width: 10,
    height: 10,
  },
});
