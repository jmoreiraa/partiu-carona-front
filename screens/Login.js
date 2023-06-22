import React, {useState} from "react";
import {TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

// Formmik
import { Formik } from "formik";

// Icones
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    Colors,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles';
import { View } from 'react-native';

//Cores
const brand = Colors;
const darkLight = Colors;
const primary = Colors;

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";


const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const getUser = async () => {
        const value = await AsyncStorage.getItem('user');
        if(value) {
            const user = JSON.parse(value)
            if(user.motorista) {
                navigation.navigate("Welcome");
            } else {
                navigation.navigate("Buscarcarona");
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <View>
        <StyledContainer>
        <StatusBar style="dark"/>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/logo-sarue.png')} />
                <PageTitle>Partiu Carona</PageTitle>
                <SubTitle>Login da Conta</SubTitle>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={async (values) => {
                        console.log(values);
                        const user = await axios.post('/user/login', {'email': values.email, 'password': values.password})
                        const jsonValue = JSON.stringify(user.data)
                        await AsyncStorage.setItem('user', jsonValue);
                        if(user.data.motorista) {
                            navigation.navigate("Welcome");
                        } else {
                            navigation.navigate("Buscarcarona");
                        }
                    }}
                >
                {({handleChange, handleBlur, handleSubmit, values}) =>  (<StyledFormArea>
                    
                        <MyTextInput 
                            label="Endereço de E-mail:"
                            icon="mail"
                            placeholder="e-mail"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('email')}
                            onBlurText={handleBlur('email')}
                            values={values.email}
                            keyboardType="email-adress"
                        />

                        <MyTextInput 
                            label="Senha:"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={Colors.darkLight}
                            onChangeText={handleChange('password')}
                            onBlurText={handleBlur('password')}
                            values={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Entrar</ButtonText>
                        </StyledButton>
                        <Line />
                    <ExtraView>
                        <ExtraText>Ainda não tem uma  conta? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Signup")}>
                            <TextLinkContent> Abrir uma conta.</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                    <ExtraView>
                        <TextLink onPress={() => navigation.navigate("Signupmoto")}>
                            <TextLinkContent> Abrir uma conta de motorista.</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </View>
    );
}

function MyTextInput({label, icon, isPassword, hidePassword, setHidePassword, ...props}) {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default Login;