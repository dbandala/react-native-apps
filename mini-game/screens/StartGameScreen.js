import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

import PrimaryButton from '../components/ui/PrimaryButton';
import alert from '../components/ui/Alert';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

const StartGameScreen = ({ onPickNumber }) => {
  [inputText, setInputNumber] = useState('');

  function confirmInputHandler() {
    const chosenNumber = parseInt(inputText);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      alert('Invalid number!', 'Number has to be between 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
      return;
    }
    onPickNumber(chosenNumber);
  }

  function resetInputHandler() {
    setInputNumber('');
  }

  function numberInputHandler(text) {
    setInputNumber(text.replace(/[^0-9]/g, ''));
  }
    return (
      <View style={styles.rootContainer}>
      <Title title="Guess My Number" />
      <Card>
          <InstructionText>Enter a number</InstructionText>
          <TextInput 
            style={styles.numberInput}
            maxLength={2}
            keyboardType='number-pad'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={inputText}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 100,
    textAlign: 'center',
    fontSize: 32,
    borderBottomColor: Colors.primaryGold,
    borderBottomWidth: 2,
    color: Colors.primaryGold,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  buttonContainer: {
    flex: 1,
    width: '90%'
  },
});