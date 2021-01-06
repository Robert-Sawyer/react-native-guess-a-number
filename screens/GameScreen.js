import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Alert, FlatList, Dimensions} from 'react-native'
// import {AntDesign} from '@expo/vector-icons'
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from '../constants/default-styles'
import MyButton from "../components/MyButton";
// import * as ScreenOrientation from 'expo-screen-orientation'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const randomNum = Math.floor(Math.random() * (max - min)) + min
    if (randomNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return randomNum
    }
}

//po zmianie na FlatList, nie używam już numeru rundy, tylko korzystam z długości listy i nie muszę ustawiać klucza
//w View ponieważ robię to wewnątrz flatList
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={DefaultStyles.bodyText}>Runda {listLength - itemData.index}:</Text>
        <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
    </View>
)


const GameScreen = props => {

    //czasami bywa przydatne też użycie ScreenOrientation z pakietu expo (działa tylko na eplikacjach zbudowanych z expo
    //ponieważ jednak wykorzystauję już API Dimensions to niepotrzebuje tego, ale jest taka opcja
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    //ustawiam zmienną do któej wrzucam pierwsze zgadywanie przez komputer i ustawiam jako aktualne zgadywanie
    //oraz pierwotny stan w tablicy z poprzednimi zgadnięciami
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    //destrukturyzuję propsy, by używać potem pobranych z props właściwości bez props. Robię to po to, by móc
    //dodac zależności w useEffect
    const {userChoice, onGameOver} = props

    //dostosowuje wysokość ekranu po obróceniu telefonu
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)

        }
    })

    //useEffect przyjmuje funkcję i będzie uruchamiać się po każdym cykl renderowania komponentu. w momencie gdy
    //komponent się odświeży / zostanie ponownie zrenderowany, useEffect uruchomi się na nowo
    useEffect(() => {
        //jeśli komputer zgadł liczbę to czas wywołać funkcję w App.js - game over która wyświetli ekran koncowy
        if (currentGuess === userChoice) {
            //przekazuję liczbę rund jakich potrzebował komputer do zgadniecia do funkcji w app.js
            onGameOver(pastGuesses.length)
        }
        //jeśli coś z tablicy zależności ulegnie zmianie, komponent zostanie zrenderowany na nowo / uruchomi
        // się useEffect
    }, [currentGuess, userChoice, onGameOver]);

    const handleNextGuess = direction => {
        if (direction === 'lower' && currentGuess < props.userChoice ||
            direction === 'greater' && currentGuess > props.userChoice) {
            Alert.alert(
                "Nie kłam",
                'Wiesz, że to nieprawda!',
                [{
                    text: 'Wybacz!',
                    style: 'cancel'
                }]
            )
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }
        //to co tu się dzieje to useRef zapisuje liczbę wylosowaną przez komputer i w zależności, czy user wybrał
        //mniejszą lub większą liczbę losuje tylko z tego nowego zakresu, jaki definiuje wylosowana liczba -
        //jeśli wybrał 50 a komputer wylosował 60 to 60 staje się nowym maximum w losowanych liczbach w nastepnym
        //kroku i analogicznie tak samo minimum, w dodatku eliminując z losowania poprzednią liczbę.
        //useRef zapisuje liczbę nawet w przypadku rerendowania się komponentu i zapisuje ją bez resetowania
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(currentRound => currentRound + 1)
        setPastGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Mój typ:</Text>
                <View style={styles.controls}>
                    <MyButton
                        style={styles.firstButton}
                        onPress={handleNextGuess.bind(this, 'lower')}>
                        {/*w taki sposób mogę dodawać ikony do aplikacji - importuję odpowiedni zbiór z
                    expo/vertical-icons i korzystając z dokumentacji wybieram nazwę ikony oraz
                     np. wielkość i kolor*/}
                        {/*<AntDesign name="caretdown" size={18}/> */}
                        MNIEJ
                    </MyButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MyButton style={styles.secButton} onPress={handleNextGuess.bind(this, 'greater')}>
                        WIĘCEJ
                    </MyButton>
                </View>
                <View style={styles.list}>
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}/>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Mój typ:</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Text style={DefaultStyles.bodyText}>Czy Twoja liczba jest:</Text>
                <Card style={styles.buttonContainer}>
                    <MyButton
                        style={styles.firstButton}
                        onPress={handleNextGuess.bind(this, 'lower')}>
                        {/*w taki sposób mogę dodawać ikony do aplikacji - importuję odpowiedni zbiór z
                    expo/vertical-icons i korzystając z dokumentacji wybieram nazwę ikony oraz
                     np. wielkość i kolor*/}
                        {/*<AntDesign name="caretdown" size={18}/> */}
                        MNIEJSZA
                    </MyButton>
                    <MyButton style={styles.secButton} onPress={handleNextGuess.bind(this, 'greater')}>
                        WIĘKSZA
                    </MyButton>
                </Card>
                <View style={styles.list}>
                    {/*można kontrolować style elementów wewnątrz kontenera poprzez
                prop: contentContainerStyle={styles.listContent}. Wtedy można dodać style do listContent
                i wówczas nada to pewne style elementom wewmątrz, np alignItems: 'center'*/}
                    {/*w scenariuszu gdy chciałym wrzucać elementy ze zgadywaniem od dołu i nadal móc
                je przewijać muszę w listContent dać dwie właściwości: justifyContent: 'flex-end' i
                flexGrow: 1*/}
                    {/*<ScrollView>*/}
                    {/*    {pastGuesses.map((guess, index) =>*/}
                    {/*        renderListItem(guess, pastGuesses.length - index))}*/}
                    {/*</ScrollView>*/}

                    {/*zamieniam scrollviev na flatlist. muszę do tego ustawić key, a on musi być
                stringiem, więc w use state i w handlenextguesses dodaję .toString() na numerze w tablicy, żeby była to
                tablica stringów*/}
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //kolejna optymalizacja w zależności od rozmiarów urządzenia - jeżeli wysokośc ekranu jest większa niż 600px
        //to wtedy zastosuj margines 20px a jeśli mniejsza to 10px
        //Dimension można używać nie tylko wewnątrz StyleSheet ale wszędzie tam, gdzie JSa, czyli na przykład w propsach,
        //np. style={Dimension(...) ? style.jakieśtam : style.innejakieśtam} albo w zwykłym ifie albo metodzie itd
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: Dimensions.get('window').width > 360 ? '70%' : '90%',
        maxWidth: '90%',
    },
    firstButton: {
        backgroundColor: '#de464b',
        paddingHorizontal: 20,
        width: 130,
    },
    secButton: {
        backgroundColor: '#296bde',
        paddingHorizontal: 20,
        width: 130,
    },
    list: {
        width: Dimensions.get('window').width > 355 ? '55%' : '80%',
        //flex: 1 w tym przypadku pozwala przewijać listę na Androidzie, na iOS można scrollowac bez tego
        flex: 1,
        // overflow: 'hidden',
    },
    listItem: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
})

export default GameScreen
