import { Text, View, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const GuessLogItem = ({ roundNumber, guess }) => {
    return (
        <View style={styles.guessLogItem}>
            <Text style={styles.guessLogText}>#{roundNumber}</Text>
            <Text style={styles.guessLogText}>Opponent's Guess: {guess}</Text>
        </View>
    );
};

export default GuessLogItem;

const styles = StyleSheet.create({
    guessLogItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 40,
        borderColor: Colors.primary800,
        borderWidth: 1,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.primaryGold,
        width: '100%',
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.26,
        shadowRadius: 4,
    },
    guessLogText: {
        fontFamily: 'open-sans',
        fontSize: 18,
    },
});
