import React from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import Card from "../components/Card";
import Colors from '../constants/colors'

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start the game!</Text>
            {/*Wysyłam props style do wewnątrz komponentu Card i tam merguję go z wewnętrznymi stylami Card*/}
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <TextInput/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Reset' color={Colors.cancelOrReset} onPress={() => {}}/>
                    </View>
                    <View style={styles.button}>
                    <Button title='Confirm' color={Colors.confirmColor} onPress={() => {}}/>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
      width: '40%',
    },
})

export default StartGameScreen
