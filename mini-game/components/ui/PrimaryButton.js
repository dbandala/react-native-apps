import { Pressable, Text, StyleSheet,View } from 'react-native';
import Colors from '../../constants/colors';

const PrimaryButton = ({ children, style, onPress }) => {
  return (
    <View style={styles.buttonOutterContainer}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed ? [ styles.buttonInnerContainer, styles.pressedButton, style ] : [styles.buttonInnerContainer, style]}
        android_ripple={{color: Colors.primary600}}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOutterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pressedButton: {
    opacity: 0.7,
    backgroundColor: '#4E0329',
  },
});
