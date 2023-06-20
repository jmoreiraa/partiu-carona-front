import React, {useState} from "react";
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
import { View, TouchableOpacity } from 'react-native';

//Cores
const brand = Colors;
const darkLight = Colors;
const primary = Colors;

//Date Time picker - expo
import DateTimePicker from '@react-native-community/datetimepicker';

//Keyboard Avoiding View
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const SignupMotorista = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

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

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
        <StatusBar style="dark"/>
            <InnerContainer>
                <PageTitle>Partiu Carona</PageTitle>
                <SubTitle>Abrir uma conta</SubTitle>
                
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
                    initialValues={{fullName: '', email: '', data: '', carro: '', placa: '', npessoas: '', whatsapp: '', hora: '', origem: '', destino: '', password: '', confirmPassword: ''}}
                    onSubmit={async (values) => {
                        console.log(values);
                        const user = await axios.post('/user/motorista', {'name': values.fullName, 'email': values.email, 'password': values.password, 'npessoas': values.npessoas, 'placa': values.placa, 'whatsapp': values.whatsapp, 'carro': values.carro, 'origem': values.origem, 'destino': values.destino, 'data': values.data, 'horario': values.hora});
                        if(user.status == 201){
                            const user = await axios.post('/user/login', {'email': values.email, 'password': values.password})
                            const jsonValue = JSON.stringify(user.data)
                            await AsyncStorage.setItem('user', jsonValue);
                            navigation.navigate("Welcome");
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
                            values={values.fullName}
                        />

                        <MyTextInput 
                            label="Endereço de E-mail:"
                            icon="mail"
                            placeholder="joao@email.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlurText={handleBlur('email')}
                            values={values.email}
                            keyboardType="email-adress"
                            />

                        <MyTextInput 
                            label="WhatsApp"
                            icon=""
                            placeholder="(99) 99999-9999"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('whatsapp')}
                            onBlurText={handleBlur('whatsapp')}
                            values={values.whatsapp}
                            keyboardType="num-telefone"
                            />
                        
                        <MyTextInput 
                            label="Modelo do carro"
                            icon=""
                            placeholder="Chevrolet Onix"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('carro')}
                            onBlurText={handleBlur('carro')}
                            values={values.carro}
                            keyboardType="carro"
                            />

                        <MyTextInput 
                            label="Origem"
                            icon=""
                            placeholder="Sua cidade"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('origem')}
                            onBlurText={handleBlur('origem')}
                            values={values.origem}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Placa"
                            icon=""
                            placeholder="placa do carro"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('placa')}
                            onBlurText={handleBlur('placa')}
                            values={values.placa}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Numero de pessoas"
                            icon=""
                            placeholder="Numero de passageiros"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('npessoas')}
                            onBlurText={handleBlur('npessoas')}
                            values={values.npessoas}
                            keyboardType="origem"
                            />
                        
                        <MyTextInput 
                            label="Horario"
                            icon="clock"
                            placeholder="00:00"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('hora')}
                            onBlurText={handleBlur('hora')}
                            values={values.hora}
                            keyboardType="origem"
                            />

                        <MyTextInput 
                            label="Destino"
                            icon=""
                            placeholder="Sua Faculdade"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('destino')}
                            onBlurText={handleBlur('destino')}
                            values={values.destino}
                            keyboardType="destino"
                            />

                        <MyTextInput 
                            label="Data Nascimento:"
                            icon="calendar"
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('data')}
                            onBlurText={handleBlur('data')}
                            values={values.data}
                            isDate={true}
                            editable={true}
                            showDatePicker={showDatePicker}
                        />

                        <MyTextInput 
                            label="Senha:"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlurText={handleBlur('password')}
                            values={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MyTextInput 
                            label="Confirme a senha:"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlurText={handleBlur('confirmPassword')}
                            values={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Cadastrar</ButtonText>
                        </StyledButton>
                        <Line />
                    <ExtraView>
                        <ExtraText>Você já tem uma  conta? </ExtraText>
                        <TextLink onPress={() => navigation.navigate("Login")}>
                            <TextLinkContent> Fazer login</TextLinkContent>
                        </TextLink>
                    </ExtraView>
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

export default SignupMotorista;