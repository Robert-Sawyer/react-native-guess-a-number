import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import Card from "../components/Card";
import Colors from '../constants/colors'
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from '../constants/default-styles'
import MyButton from "../components/MyButton";


const StartGameScreen = props => {

    //tworzę obsługę walidacji dla wprowadzanej wartości na androidzie
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

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

    const handleResetInput = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    //ustawiam tutaj wybrany numer czyli efekt po kliknięciu CONFIRM. najpierw parsuję liczbę na int, potem sprawdzam
    //czy na pewno jest liczbą, czy zawiera się w dopuszczelnym zakresie, a jeśli nie, to wyświetlam alert wosobnym
    //okienku. alert() - pierwszy argument to tytuł alertu, drugi komunikat, a trzeci to obiekt zawierający informacje
    //o rodzaju przycisku zamykającego: jego treści, ostylowaniu i reakcji na klikięcie
    //po walidaji ustawiam decyzję o potwierdzeniu, ustawiam ostatecznie wybraną liczbę i resetuję wartość w inpucie
    const handleConfirmInput = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Nieprawidłowa liczba',
                'Liczba powinna zawierać się w zakresie od 1 do 99',
                [{
                    text: 'OK',
                    style: 'destructive',
                    onPress: handleResetInput
                }])
            return;
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    //to info w postaci tekstu który wyświetli się pod card po kliknięciu w CONFIRM
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.confirmationInfo}>
                <Text style={DefaultStyles.bodyText}>Wybrałeś/aś:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <View style={styles.startButton}>
                    <MyButton
                        onPress={() => props.onStartGame(selectedNumber)}>ZAGRAJMY
                    </MyButton>

                </View>
            </Card>
    }

    return (
        <ScrollView>
            {/*KAV jest komponentem który pomaga zmienić zachowanie klawiatury w momencie kliknięcia na inputa i
            żeby klawiatura go nie zasłoniła. Musi sie on znajdowac wewnątrz komponentu takiego jak Scrollview i
            przyjmuje kilka propsów, np keyboardVerticalOffset definiuje o ile px przesunie sie element gdy włączy
            sie klawiatura - ta właściwośc przydaje się na iOS. Behavior - na iOS najlepiej zachowuje się position,
            a na Androidzie padding*/}
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
                    <View style={styles.screen}>
                        <Text style={DefaultStyles.title}>Zagrajmy w grę!</Text>
                        {/*Wysyłam props style do wewnątrz komponentu Card i tam merguję go z wewnętrznymi stylami Card*/}
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyles.bodyText}>Wybierz liczbę od 1 do 99</Text>
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
                                    <Button
                                        title='Reset'
                                        color={Colors.cancelOrReset}
                                        onPress={handleResetInput}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title='Potwierdź'
                                        color={Colors.confirmColor}
                                        onPress={handleConfirmInput}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        //poniżej optymalizacja na małe urządzenia: domyślnie ramka zajmuje 80% ekranu, ale jeśli jest to mały ekran,
        //wówczas zajmie MINIMUM 300px ALE nie więcej niż 95% szerokości, czyli może byc mniej niż 300px wtedy gdy
        //szerokośc ekranu jest jeszcze mniejsza
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
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
        width: '46%',
        //szerokośc można też alternatywnie za pomocą Dimensions
        // width: Dimensions.get('window').width / 3.5
    },
    confirmationInfo: {
        marginVertical: 20,
        width: '60%',
        alignItems: 'center',
    },
    startButton: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
})

export default StartGameScreen
