import React, {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Formmik
import { Formik } from "formik";

// Icones
import {Octicons, Ionicons, Fontisto, AntDesign} from '@expo/vector-icons';


import {
    Colors,
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
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from '../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

//Cores
const brand = Colors;
const darkLight = Colors;
const primary = Colors;

//Date Time picker - expo
import DateTimePicker from '@react-native-community/datetimepicker';

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const EditarMotorista = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

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

    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        const value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value))
        setLoading(false)
    }

//Data de nascimento a ser enviado pelo usuario
const [dob, setDob] = useState();

const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
}

const showDatePicker = () => {
    setShow(true);
}

useEffect(() => {
    getUser()
}, [])

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
                <PageTitle>Editar conta</PageTitle>
                
                {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode='date'
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}

                <Formik
                    initialValues={{fullName: user.name, data: user.data, carro: user.carro, placa: user.placa, npessoas: user.npessoas, whatsapp: user.whatsapp, hora: user.horario, origem: user.origem, destino: user.destino}}
                    onSubmit={async (values) => {
                        console.log(values);
                        const user2 = await axios.put('/user', {'name': values.fullName, 'npessoas': values.npessoas, 'placa': values.placa, 'whatsapp': values.whatsapp, 'carro': values.carro, 'origem': values.origem, 'destino': values.destino, 'data': values.data, 'horario': values.hora},  {headers: {'Authorization': `Bearer ${user.token}`}});
                        if(user2.status == 200){
                            const jsonValue = JSON.stringify(user2.data);
                            await AsyncStorage.removeItem('user');
                            await AsyncStorage.setItem('user', jsonValue);
                            navigation.goBack();
                        }
                    }}
                >
                {({handleChange, handleBlur, handleSubmit, values}) =>  (<StyledFormArea>
                        <MyTextInput 
                            label="Nome completo:"
                            icon="person"
                            placeholder="Seu nome"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullName')}
                            onBlurText={handleBlur('fullName')}
                            value={values.fullName}
                        />

                        <MyTextInput 
                            label="WhatsApp"
                            icon=""
                            placeholder="5515997551298"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('whatsapp')}
                            onBlurText={handleBlur('whatsapp')}
                            value={values.whatsapp}
                            keyboardType="num-telefone"
                            />
                        
                        <MyTextInput 
                            label="Modelo do carro"
                            icon=""
                            placeholder="Chevrolet Onix"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('carro')}
                            onBlurText={handleBlur('carro')}
                            value={values.carro}
                            keyboardType="carro"
                            />

                        <MyTextInput 
                            label="Origem"
                            icon=""
                            placeholder="Sua cidade"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('origem')}
                            onBlurText={handleBlur('origem')}
                            value={values.origem}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Placa"
                            icon=""
                            placeholder="Placa do carro"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('placa')}
                            onBlurText={handleBlur('placa')}
                            value={values.placa}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Numero de pessoas"
                            icon=""
                            placeholder="Numero de passageiros"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('npessoas')}
                            onBlurText={handleBlur('npessoas')}
                            value={values.npessoas}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Horario"
                            icon=""
                            placeholder="00:00"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('hora')}
                            onBlurText={handleBlur('hora')}
                            value={values.hora}
                            keyboardType="origem"
                            />

                        <MyTextInput 
                            label="Destino"
                            icon=""
                            placeholder="Sua Faculdade"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('destino')}
                            onBlurText={handleBlur('destino')}
                            value={values.destino}
                            keyboardType="destino"
                            />

                        <MyTextInput 
                            label="Data Nascimento:"
                            icon="calendar"
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('data')}
                            onBlurText={handleBlur('data')}
                            value={values.data}
                            isDate={true}
                            editable={true}
                            showDatePicker={showDatePicker}
                        />
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Editar</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={() => navigation.goBack()}>
                            <ButtonText>Voltar</ButtonText>
                        </StyledButton>
                      
                </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                <StyledTextInput {...props} />
                </TouchableOpacity>}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )
}

export default EditarMotorista;