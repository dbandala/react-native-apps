import { Text, StyleSheet } from 'react-native';

const Title = ({ title }) => {
    return (
        <Text style={styles.title}>{title}</Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        marginVertical: 10,
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    },
});