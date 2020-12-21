import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Card from "../components/Card";
import Colors from '../constants/colors'
import Input from "../components/Input";

const StartGameScreen = props => {

    //tworzę obsługę walidacji dla wprowadzanej wartości na androidzie
    const [enteredValue, setEnteredValue] = useState('')

    //metoda do walidacji wprowadzanych danych - wpisaną przez usera wartość zamieniam dzięki .replace():
    //jeśli user wprowadził do inputa cokolwiek innego niż cyfry od 0 do 9, np, przecinek, lub kropkę, to zamień tę
    //wartość na pusty string ''. 'g' oznacza w regexie flagę globalną - program obejmie całą aktywną cześc aplikacji
    const handleNumberValue = (inputValue) => {
        setEnteredValue(inputValue.replace(/[^0-9]/g, ''))
    }

    //w momencie kliknięcia na inputa pojawia sie klawiatura, ta metoda zamyka ją gdy kliknę obok
    //Keyboard to nie komponent tylko interfejs API który dostarcza React Native by kontrolować klawiaturę
    const handleCloseKeyboard = () => {
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
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
                        onChangeText={handleNumberValue}
                        value={enteredValue}
                        blurOnSubmit
                        keyboardType='number-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={2}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' color={Colors.cancelOrReset} onPress={() => {
                            }}/>
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' color={Colors.confirmColor} onPress={() => {
                            }}/>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
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
