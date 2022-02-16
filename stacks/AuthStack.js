import React from 'react';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import ResetPassword from '../screens/ResetPassword';
import ResetPass from '../screens/ResetPass';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = ({}) => {
    return (
        <Stack.Navigator initialRouteName='Splash' screenOptions={{
            header: () => null,
        }}>
            <Stack.Screen name='Splash' component={Splash}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='ResetPassword' component={ResetPassword}/>
            <Stack.Screen name='ResetPass' component={ResetPass}/>
        </Stack.Navigator>
    );
}

export default AuthStack;
