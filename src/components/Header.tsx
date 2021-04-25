import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import userPng from '../assets/bruno.png'
import fonts from '../styles/fonts'

export function Header() {
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>Bruno</Text>
            </View>
            <Image source={userPng} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
        marginTop:34
    },
    greeting:{
        fontSize:32,
        fontFamily:fonts.text,
        color:colors.heading
    },
    userName:{
        fontSize:32,
        fontFamily:fonts.heading,
        color:colors.heading,
        lineHeight:40
    },
    image:{
        width:70,
        height:70,
        borderRadius:40
    }
})