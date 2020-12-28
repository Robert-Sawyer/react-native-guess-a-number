import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import DefaultStyles from '../constants/default-styles'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Gra skończona!</Text>
            <Text style={DefaultStyles.bodyText}>Liczba rund: {props.roundsNumber}</Text>
            <Text style={DefaultStyles.bodyText}>Twoją liczbą było: {props.userNumber}</Text>
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
