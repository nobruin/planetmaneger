import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'

import wateringImg from "../assets/watering.png";
import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {'\n'}
                suas plantas {'\n'}
                de forma facil
            </Text>
            <Image source={wateringImg} />
            
            <Text style={styles.subTitle}>
                Não esqueça mais de regar suas plantas
                Nós cuidamos de lembrar você sempre que precisar
            </Text>
            <Button title={'>'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'space-between'
    },
    title:{
        fontSize:3,
        fontWeight:'bold',
        textAlign:'center',
        color:colors.heading,
        marginTop:38
    },
    subTitle:{
        textAlign:'center',
        fontSize:18,
        paddingHorizontal:18,
        color:colors.heading,
    },
    image:{
      width:292,
      height:284  
    },
});