import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import alert from '../components/ui/Alert';
import InstructionText from '../components/ui/InstructionText';
import Card from '../components/ui/Card';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  return rndNum==exclude && min<max ? generateRandomBetween(min, max, exclude) : rndNum;
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  function nextGuessHandler(direction) { // direction is 'lower' or 'greater'
    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
      alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }
    // make another guess
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess;
    }
    setCurrentGuess(generateRandomBetween(minBoundary, maxBoundary, currentGuess));
    setGuessRounds(prevGuessRounds => [currentGuess, ...prevGuessRounds]);
  }

  useEffect(() => {
    if (currentGuess === userNumber) {
      alert('Game Over!', `The computer guessed the number ${userNumber} in ${guessRounds.length} attempts.`, [{ text: 'Okay', style: 'cancel' }]);
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const guessRoundsLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title title="Opponent's Guess" />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")} >
              <Ionicons name="add-circle-outline" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRounds =>
          <Text key={guessRounds}>{guessRounds}</Text>
        )} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsLength-itemData.index} guess={itemData.item} />}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  buttonContainer: {
    flex: 1,
    width: '90%'
  },
  instructionText: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 12,
  }
});