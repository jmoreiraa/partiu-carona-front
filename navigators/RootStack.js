import React from 'react';

import {Colors} from "./../components/styles";

//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas:
import Login from './../screens/Login';
import Singup from './../screens/Signup';
import SingupMotorista from './../screens/SignupMotorista';
import Welcome from './../screens/Welcome';
import BuscarCarona from '../screens/BuscarCarona';
import Editar from '../screens/editar';
import EditarMotorista from '../screens/editarMotorista';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyled: {
                        backgroundColor: 'transparent'
                    },
                    headerShown: false,
                    swipeEdgeWidth: 0,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20,
                    }
                }}
                initialRouteName="Login"
                >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen options={{ unmountOnBlur: true }} name="Buscarcarona" component={BuscarCarona}/>
                <Stack.Screen name="Signup" component={Singup}/>
                <Stack.Screen name="Editar" component={Editar}/>
                <Stack.Screen name="Editarmoto" component={EditarMotorista}/>
                <Stack.Screen name="Signupmoto" component={SingupMotorista}/>
                <Stack.Screen name="Sig" component={Singup}/>
                <Stack.Screen options={{ headerTintColor: "white"}} name="Welcome" component={Welcome}/>
            </Stack.Navigator>
        </NavigationContainer>
        )
}

export default RootStack;
