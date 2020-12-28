import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'


const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={DefaultStyles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.headerColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Header
