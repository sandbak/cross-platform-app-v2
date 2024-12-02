import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';

export const DetailsScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      
      <Card>
        <Text style={styles.cardTitle}>Navigation Example</Text>
        <Text style={styles.cardText}>
          This screen demonstrates navigation between different views in your app.
          The same code works on both web and mobile platforms!
        </Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Go Back" 
            variant="secondary"
            onPress={() => navigate(-1)} 
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
    alignItems: 'center',
  },
});
