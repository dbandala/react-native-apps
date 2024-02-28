import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

const Card = ({ children }) => {
    return (
        <View style={styles.inputContainer}>{children}</View>
    );
};

export default Card;

const styles = StyleSheet.create({
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // center horizontally on ios
        marginHorizontal: 'auto', // center horizontally on android/webb
        marginTop: 40,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        height: 200,
        //width:  '90%',
        elevation: 4, // shadow on android - not working on ios
        shadowColor: 'black', // shadow on ios
        shadowOpacity: 0.25, // shadow on ios
        shadowRadius: 6, // shadow on ios
        shadowOffset: { width: 0, height: 2 }, // shadow on ios
    },
});