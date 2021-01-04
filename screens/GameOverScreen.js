import React from 'react'
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'
import DefaultStyles from '../constants/default-styles'
import Color from '../constants/colors'
import MyButton from "../components/MyButton";


const GameOverScreen = props => {
    return (
        <ScrollView>
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
                        Potrzebowałem <Text style={styles.highlighted}>{props.roundsNumber}</Text> rund, żeby odgadnąć
                        Twój numer
                    </Text>
                    <Text style={DefaultStyles.bodyText}>
                        Twoją liczbą było: <Text style={styles.highlighted}>{props.userNumber}</Text>
                    </Text>
                </View>
                <MyButton onPress={props.onRestart}>NOWA GRA</MyButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.75 / 2,
        borderWidth: 3,
        borderColor: '#000',
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').width * 0.75,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30,
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
