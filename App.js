import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)

    const handleNewGame = () => {
        //rozpoczynając grę ustawiam z powrotem liczbe zgadywań komputerea na 0
        setGuessRounds(0)
        //ustawiam też liczbę usera na null, żeby poniżej, w content nie był spełniony żaden if i żeby uruchomił
        //się pierwszy ekran
        setUserNumber(null)
    }

    const handleStartGame = (selectedNumber) => {
        setUserNumber(selectedNumber)
    }

    //chcę, żeby program liczył liczbę rund/zgadywańi gdy skończy, pokazywałza którym razem zgadł
    const handleGameOver = numOfRounds => {
        setGuessRounds(numOfRounds)
    }

    let content = <StartGameScreen onStartGame={handleStartGame}/>

    //jeśli liczba rund jest zerowa to znaczy że gra się nie zaczęłą, a jeśli większa to znaczy, że należy wyświetlić
    //ekran końcowy
    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={handleGameOver}/>
    } else if (guessRounds > 0) {
        content =
            <GameOverScreen
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={handleNewGame}
            />
    }

    return (
        <View style={styles.screen}>
            <Header title='Zgadnij liczbę'/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
