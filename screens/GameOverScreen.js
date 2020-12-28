import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'
import DefaultStyles from '../constants/default-styles'
import Color from '../constants/colors'


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
            <View style={styles.textContainer}>
                {/*Jeśli zagnieździłbym Text wewnątrz innego komponentu Text to wtedy style w tym wewnątrz
            zostałyby odziedziczone od rodzica. Jest to wyjątek w ReactNative, ponieważ generalnie
            style nie są w RN dziedziczone np z View na Text w środku*/}
                <Text style={DefaultStyles.bodyText}>
                    Potrzebowałem <Text style={styles.highlighted}>{props.roundsNumber}</Text> rund, żeby odgadnąć Twój numer
                </Text>
                <Text style={DefaultStyles.bodyText}>
                    Twoją liczbą było: <Text style={styles.highlighted}>{props.userNumber}</Text>
                </Text>
            </View>
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
    textContainer: {
        width: '80%',
        textAlign: 'center',
    },
    highlighted: {
        color: Color.headerColor,
        fontWeight: 'bold',
    },
})

export default GameOverScreen
