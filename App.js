import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [guessRounds, setGuessRounds] = useState(0)

    const handleStartGame = (selectedNumber) => {
        setUserNumber(selectedNumber)
        //rozpoczynając grę ustawiam z powrotem liczbe zgadywań komputerea na 0
        setGuessRounds(0)
    }

    //chcę, żeby program liczył liczbę rund/zgadywańi gdy skończy, pokazywałza którym razem zgadł
    const handleGameOver = numOfRounds => {
        setGuessRounds(numOfRounds)
    }

    let content = <StartGameScreen onStartGame={handleStartGame}/>

    //jeśli liczba rund jest zerowa to znaczy że gra się nie zaczęłą, a jeśli większa to znaczy, że należy wyświetlić
    //ekran końcowy
    if(userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={handleGameOver}/>
    } else if (guessRounds > 0) {
        content = <GameOverScreen/>
    }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number'/>
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
