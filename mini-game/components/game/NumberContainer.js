import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.primaryGold,
        padding: 24,
        borderRadius: 8,
        margin: 24,
        alignContent: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.primaryGold,
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'open-sans-bold',
    }
});