import React, {useState, useEffect, useContext} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import Center from './Center';
import AuthStack from '../stacks/AuthStack';
import AppNav from '../stacks/AppNav';
import Loader from "../components/loader";

const Routes = ({}) => {
    const {user, login} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    })

    if(loading === true) {
        return (
            <Loader loading={loading}/>
        );
    }

    return (
        <NavigationContainer>
            {user == null ? <AuthStack/> : <AppNav/>}
        </NavigationContainer>
    );
}

export default Routes;
