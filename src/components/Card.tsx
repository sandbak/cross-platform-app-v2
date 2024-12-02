import { View, StyleSheet } from 'react-native';

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <View style={styles.card}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
