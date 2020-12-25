import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Gra skończona!</Text>
            <Text>Liczba rund: {props.roundsNumber}</Text>
            <Text>Twoją liczbą było: {props.userNumber}</Text>
            <Button title="NOWA GRA" onPress={props.onRestart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default GameOverScreen
