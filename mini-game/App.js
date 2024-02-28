import { useState, useCallback } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/colors';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded, fontError] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <AppLoading />;
  }

  function startGameHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  // define initial screen to show
  let screen = <StartGameScreen onPickNumber={startGameHandler} />;
  if (userNumber) { // verify status of the game
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} onIncreaseAttempt={setGuessRounds} attemptsValue={guessRounds} />;
  }
  if (gameIsOver && userNumber){ // verify status of the game
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onNewGame={startNewGameHandler} />;
  }

  return (
    <LinearGradient
      style={styles.rootScreen}
      colors={[Colors.primary800, Colors.primaryGold]}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={{ opacity: 0.4 }}
      >
        <SafeAreaView style={styles.rootScreen} >{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
