import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import DefaultStyles from '../constants/default-styles'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Gra skończona!</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/success.png')}
                    //jesli chcę pobrać obraz z internetu to wtedy robię jak poniżej
                    // source={{uri: 'https://blablabla.pl/blablabla'}}
                    //resizeMode domyślnie ustawia cover ale mozna tez ustawic contain, center, repeat i stretch
                    resizeMode="cover"
                    //w przypadku obrazów pobranych z internetu można ustawić czas efektu fade-in w ms
                    // fadeDuration={1000}
                />
            </View>
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
    imageContainer: {
        borderRadius: 140,
        borderWidth: 3,
        borderColor: '#000',
        width: 280,
        height: 280,
        overflow: 'hidden',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

export default GameOverScreen
