import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFiled, setIsFiled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    async function handleNavigation() {
        if(!name){
            return Alert.alert(`Me diz como chamar você`);
        }

        await AsyncStorage.setItem('@plantmanager:user', name);
        navigation.navigate('Confirmation');
    }

    function handleInputBlur(){
        setIsFocused(false);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChangeText(value: string){
        setIsFiled(!!value);
        setName(value);
    }
    return(
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios'  ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        
            <View style={styles.content}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.emoji}>
                            {isFiled ? '😊' : '😆'}
                        </Text>
                        <Text style={styles.title}>
                            Como podemos {'\n'}
                            chamar você
                        </Text>
                    </View>
                    <TextInput 
                        style={[
                            styles.input,
                            (isFocused || isFiled) &&
                            {borderColor:colors.green}
                        ]} 
                        placeholder="Digite um nome"
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                        onChangeText={handleInputChangeText}
                        />
                </View>

                <View style={styles.footer}>
                    <Button 
                    title="Confirmar" 
                    onPress={handleNavigation}
                    />
                </View>               
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:10,
    },
    content:{
        flex:1,
        width:'100%',
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:54,
        alignItems:'center'
    },
    header:{
        alignItems:'center'
    },
    emoji:{
        fontSize:44,
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        width:'100%',
        fontSize:18,
        marginTop:50,
        padding:10,
        textAlign:'center',
        fontFamily:fonts.heading
    },
    title:{
        marginTop:20,
        fontSize:24, 
        lineHeight:32,
        textAlign:'center',
        fontFamily:fonts.heading,
        color:colors.heading
    },
    footer:{
        marginTop:25,
        width:'100%',
        marginBottom:30,
        paddingHorizontal:20
    }
});