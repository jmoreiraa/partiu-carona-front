import React from "react";
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, ScrollView, Text} from 'react-native';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';

const Welcome = ({navigation}) => {

    const [ user, setUser ] = useState({
        "id": 0,
        "name": "",
        "email": "",
        "motorista": 1,
        "npessoas": 1,
        "placa": "",
        "whatsapp": "",
        "carro": "",
        "visible": 1,
        "origem": "",
        "destino": "",
        "data": "",
        "horario": "",
        "created_at": "2023-06-10T01:45:37.000000Z",
        "updated_at": "2023-06-10T01:45:37.000000Z",
        "token": ""
    })

    const getUser = async () => {
        const value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value))
    }

    const sair = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate("Login");
    }

    const editar = async () => {
        navigation.navigate("Editarmoto");
    }

    const visib = async () => {
        const user2 = await axios.put('/user/motorista/visible',  {},{headers: {'Authorization': `Bearer ${user.token}`}})
        if(user2.status == 200){
            const jsonValue = JSON.stringify(user2.data);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('user', jsonValue);
            getUser()
        }
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getUser();
        });
    }, [getUser])

    return (
        <ScrollView>
            <StatusBar style="light"/>
            <InnerContainer>
                <WelcomeImage source={require('./../assets/fundo2.jpg')}/>
                <WelcomeContainer>
                    <PageTitle Welcome={true}>Seja bem-vindo(a)!</PageTitle>
                    <SubTitle Welcome={true}>{user.name}</SubTitle>
                    <SubTitle Welcome={true}>{user.email}</SubTitle>
                    <StyledFormArea>      
                        <Avatar source={require('./../assets/avatar1.jpg')} />
                        <Line />
                            <StyledButton onPress={editar}>
                                <ButtonText>Editar</ButtonText>
                            </StyledButton>
                            <StyledButton onPress={visib}>
                                <ButtonText>Ficar {user.visible ? 'invisível' : 'visível'}</ButtonText>
                            </StyledButton>
                            <StyledButton onPress={sair}>
                                <ButtonText>Sair</ButtonText>
                            </StyledButton>
                
                    </StyledFormArea>

                </WelcomeContainer>
            </InnerContainer>
        </ScrollView>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Welcome;