import React from "react";
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Card, Divider } from '@rneui/themed';

//Cores
const brand = Colors;
const darkLight = Colors;
const primary = Colors;

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "./../components/KeyboardAvoidingWrapper";


const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const [ user, setUser ] = useState({
        "id": 0,
        "name": "",
        "email": "",
        "motorista": 1,
        "npessoas": 1,
        "placa": "",
        "whatsapp": "",
        "carro": "",
        "origem": "",
        "destino": "",
        "data": "",
        "horario": "",
        "created_at": "2023-06-10T01:45:37.000000Z",
        "updated_at": "2023-06-10T01:45:37.000000Z",
        "token": ""
    })

    const [carros, setCarros] = useState([])
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        const value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value))
        const cars = await axios.get('/user/caronas', {headers: {'Authorization': `Bearer ${JSON.parse(value).token}`}})
        setCarros(cars.data.data)
        setLoading(false)
    }

    const sair = async () => {
        await AsyncStorage.removeItem('user');
        navigation.navigate("Login");
    }

    const editar = async () => {
        navigation.navigate("Editar");
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            setLoading(true);
            getUser();
        });
    }, [getUser])

    if(loading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>

        <StatusBar style="dark"/>
            <InnerContainer>

                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                        navigation.navigate("Welcome");
                    }}
                >
                {({handleChange, handleBlur, handleSubmit, values}) =>  (<StyledFormArea>
                <StyledButton onPress={editar}>
                <ButtonText>Editar</ButtonText>
                </StyledButton>
                <StyledButton onPress={sair}>
                <ButtonText>Sair</ButtonText>
                </StyledButton>
                <FlatList
                data={carros}
                renderItem={({item}) => <CardCustom name={item.name} passa={item.npessoas} horario={item.horario} car={item.carro} whatsapp={item.whatsapp} placa={item.placa} />}
                />
                </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const CardCustom = ({name, car, whatsapp, placa, horario, passa}) => {
    return (
        <TouchableOpacity onPress={async () => await Linking.openURL(`https://api.whatsapp.com/send/?phone=${whatsapp}`)}>
            <Card>
                <View style={styles.user}>
                    <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={require('./../assets/avatar1.jpg')}
                    />
                    <Text style={styles.name}>Nome: {name}  </Text>
                    <Divider orientation="vertical" />
                    <Text style={styles.name}> Carro: {car}  </Text>
                    <Divider orientation="vertical" />
                    <Text style={styles.name}> Número de passageiros: {passa}  </Text>
                    <Divider orientation="vertical" />
                    <Text style={styles.name}> Placa: {placa}  </Text>
                    <Divider orientation="vertical" />
                    <Text style={styles.name}> Horario de saida: {horario}  </Text>
              </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },

    click: {
        cursor: 'pointer'
    }
});

export default Login;