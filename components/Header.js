import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'


const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })}}>
            <Text style={DefaultStyles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //w taki sposób można bardzo łatwo ustawiac przeróżne właściwości elementów aplikacji w zależności od systemu
    //operacyjnego. dzięki temu rozdzieleniu kod jest czystszy i merguję go w style={} powyżej, w JSX
    headerAndroid:{
        backgroundColor: Colors.headerColor,
    },
    headerIOS: {
        backgroundColor: '#db20bc',
        borderBottomWidth: 2,
        borderColor: '#000'
    },
})

export default Header
