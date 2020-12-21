import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Input = props => {
    //dzięki ...props można ustawić konfigurację i właściwości w miejscu gdzie importuję ten komponent, np
    //w StartGameScreen
    return <TextInput {...props} style={{...styles.input, ...props.style}}/>
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        marginVertical: 15,
        borderBottomColor: '#858585',
        borderBottomWidth: 1,
    }
})

export default Input
