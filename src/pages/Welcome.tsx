import React from 'react'
import {Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, View } from 'react-native'
import wateringImg from "../assets/watering.png";
import colors from '../styles/colors';
import {Feather} from '@expo/vector-icons';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/core';

export function Welcome() {
const navigation = useNavigation();

function handleNavigation() {
    navigation.navigate('UserIdentification');
}

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma facil
                </Text>
                <Image source={wateringImg} style={styles.image} resizeMode="contain" />
                
                <Text style={styles.subTitle}>
                    Não esqueça mais de regar suas plantas
                    Nós cuidamos de lembrar você sempre que precisar
                </Text>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.7}
                    onPress={handleNavigation}
                    >
                        <Feather name="chevron-right" style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        flex:1,
        alignItems: 'center',
        justifyContent:'space-around',
        paddingHorizontal:20,
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center',
        color:colors.heading,
        marginTop:38,
        fontFamily:fonts.heading,
        lineHeight:34,
    },
    subTitle:{
        textAlign:'center',
        fontSize:18,
        paddingHorizontal:18,
        color:colors.heading,
        fontFamily:fonts.text,
    },
    image:{
      height:Dimensions.get('window').width * 0.7 
    },
    button:{
        backgroundColor:colors.green,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        borderRadius:16,
        height:56,
        width:56,
        paddingHorizontal:10
    },
    buttonText:{
        color:colors.white,
        fontSize:24
    },
    buttonIcon:{
        fontSize:32,
        color:colors.white,
    }
});