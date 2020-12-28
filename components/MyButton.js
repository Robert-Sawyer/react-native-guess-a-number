import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../constants/colors'

const MyButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.headerColor,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: '#fff',
        fontSize: 17,
        letterSpacing: 1,
    },
})

export default MyButton
