import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Card from "../components/Card";
import Colors from '../constants/colors'
import Input from "../components/Input";

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start the game!</Text>
            {/*Wysyłam props style do wewnątrz komponentu Card i tam merguję go z wewnętrznymi stylami Card*/}
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                {/*TextInput, któy jest wewnątrz tego inputa ma wiele opcji konfiguracji i modyfikacji wprowadzanych
                danych - wszystko w dokumentacji. Poniżej wykorzystam tylko rodzaj klawiatury, wyłączenie autokorekty,
                rozmycie po kliknięciu i ograniczenie liczby do 99*/}
                <Input
                    style={styles.input}
                    blurOnSubmit
                    keyboardType='number-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={2}
                />
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
    input: {
        width: 50,
        textAlign: 'center',
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
