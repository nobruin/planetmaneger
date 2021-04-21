import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'

export function PlanetSelect(){
    return(
        <View>
            <Text>
                Selecionar Planta
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background
    }
})