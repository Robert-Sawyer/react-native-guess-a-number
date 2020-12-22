import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: Colors.headerColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        color: Colors.headerColor,
        fontSize: 22,
    },
})

export default NumberContainer
