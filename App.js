import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

//informuję aplikację, gdzie są moje czcionki i pod jakimi nazwami chcę ich używac
//load async zwraca Promise więc portwa to trochę dłużej, ale za to będę mógł skorzystac z komponentu AppLaoding
//dzięki czemu czcnionki będą mogły załadować sie na samym początku aplikacji a w razie niepowodzenia nie
//wyskoczy błąd. Początkowe ładowanie apki potrwa dłużej, bo czcionki ładuję ascynchronicznie, ale jeśli się
//nie uda to po prostu apka załaduje się z domyślną czcionką
const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
}

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)

    //ten if jest po to, że nie chcę ładować reszty aplikacji jeśli nie pobiorę najpierw potrzebnych danych, np
    //czcionek. startAsync - wskazuję operację, którą chcę rozpocząć, gdy aplikacja jest renderowana po raz
    //pierwszy. W startasync musi być przekazana funkcja która zwraca Promise, bo expo poczeka na wykonanie tej
    //obietnicy i będzie wiedział, że ładowanie jest skoczone, a potem wykona funkcję, która wykona się poprzez
    //prop onFinish, czyli tutaj zmieni dataLoaded na true i pozwoli to na kontynuowanie renderowania reszty apki
    if (!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => { console.log(err) }}
        />
    }
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
