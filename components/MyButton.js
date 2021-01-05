import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native'
import Color from '../constants/colors'

const MyButton = props => {

    let ButtonComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress}>
                <View style={{...styles.button, ...props.style}}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
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
