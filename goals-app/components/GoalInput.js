import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Image } from 'react-native';

const GoalInput = (props) => {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        //console.log(enteredText);
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    source={require('../assets/images/goal.png')}
                    style={styles.logo} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Your course goal!"
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" color="red" onPress={props.onCancel} />    
                    </View>
                    <View style={styles.button}>
                        <Button title="Add Goal" onPress={addGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        padding: 16,
        backgroundColor: '#311b6b',
    },
    textInput: {
        borderColor: 'dimgray',
        backgroundColor: 'dimgray',
        borderWidth: 1,
        borderRadius: 6,
        width: '92%',
        marginRight: 8,
        padding: 8,
        color: 'white',
        padding: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 12,
    },
    button: {
        width: '40%',
        marginHorizontal: 8,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
    }
});