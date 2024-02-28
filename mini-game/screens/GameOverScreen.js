import { View, Text, StyleSheet, Image } from 'react-native';

import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';

const GameOverScreen = props => {
    return (
        <View style={styles.rootContainer}>
            <Title title="Game Over!" />
            <View style={styles.imageContiner}>
                <Image style={styles.image} source={require('../assets/images/success.png')} />
            </View>
            <View >
                <Text style={styles.summaryText}>Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></Text>
                <Text style={[styles.summaryText, {marginBottom: 24}]}>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></Text>
                <PrimaryButton onPress={props.onNewGame} >New Game</PrimaryButton>
            </View>
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContiner: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    }
});