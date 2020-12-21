import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {
    return (
        //operator ... sprawi, że jeśli dostarczymy jakis element (który będzie dzieckiem tego komponentu (children)),
        //to style card zostaną przysłonięte tymi z zewnątrz - te poniżej to wspólne style dla wszystkich kart,
        //ale niektóre mogą mieć cechy szczególne i zostaną one dodane do tych, co poniżej
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        //właściwości shadow... są dostępne tylko na iOS a elevation tylko na Androidzie - oba dotyczą stylowania cienia
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
})

export default Card
