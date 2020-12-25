import React, {useState, useRef, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

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

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
    const [rounds, setRounds] = useState(0)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    //destrukturyzuję propsy, by używać potem pobranych z props właściwości bez props. Robię to po to, by móc
    //dodac zależności w useEffect
    const {userChoice, onGameOver} = props

    //useEffect przyjmuje funkcję i będzie uruchamiać się po każdym cykl renderowania komponentu. w momencie gdy
    //komponent się odświeży / zostanie ponownie zrenderowany, useEffect uruchomi się na nowo
    useEffect(() => {
        //jeśli komputer zgadł liczbę to czas wywołać funkcję w App.js - game over która wyświetli ekran koncowy
        if (currentGuess === userChoice) {
            //przekazuję liczbę rund jakich potrzebował komputer do zgadniecia do funkcji w app.js
            onGameOver(rounds)
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
            currentLow.current = currentGuess
        }
        //to co tu się dzieje to useRef zapisuje liczbę wylosowaną przez komputer i w zależności, czy user wybrał
        //mniejszą lub większą liczbę losuje tylko z tego nowego zakresu, jaki definiuje wylosowana liczba -
        //jeśli wybrał 50 a komputer wylosował 60 to 60 staje się nowym maximum w losowanych liczbach w nastepnym
        //kroku i analogicznie tak samo minimum, w dodatku eliminując z losowania poprzednią liczbę.
        //useRef zapisuje liczbę nawet w przypadku rerendowania się komponentu i zapisuje ją bez resetowania
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currentRound => currentRound + 1)
    }

    return (
        <View style={styles.screen}>
            <Text>Mój typ:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Text>Czy Twoja liczba jest:</Text>
            <Card style={styles.buttonContainer}>
                <Button title='MNIEJSZA' onPress={handleNextGuess.bind(this, 'lower')}/>
                <Button title='WIĘKSZA' onPress={handleNextGuess.bind(this, 'greater')}/>
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
    buttonContainer: {
      flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: 300,
        maxWidth: '80%',
    },
})

export default GameScreen
