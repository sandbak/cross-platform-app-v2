import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ onPress, title, variant = 'primary' }: ButtonProps) => (
  <TouchableOpacity 
    style={[styles.button, variant === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary]} 
    onPress={onPress}
  >
    <Text style={[styles.text, variant === 'secondary' ? styles.textSecondary : styles.textPrimary]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: '#007AFF',
  },
});
