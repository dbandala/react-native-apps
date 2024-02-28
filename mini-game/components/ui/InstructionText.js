import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';

const InstructionText = ({ children, style }) => {
    return (
        <Text style={[ styles.instructionText, style ]}>{children}</Text>
    );
};

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'opens-sans',
        color: Colors.primaryGold,
        fontSize: 24,
    },
});