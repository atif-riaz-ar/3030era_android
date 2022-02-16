import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import AuthProvider from './AuthProvider';
import Route from './Route';
import Notify from "../globals/notify";

const Providers = ({}) => {

    const[trig, setTrig] = useState(false);

    useEffect(() => {
        setTrig(true);
    })

    return (
        <SafeAreaView style={{flex: 1}}>
            <AuthProvider>
                <Route/>
            </AuthProvider>
            { !trig ? <></> : <Notify/> }
        </SafeAreaView>
    );
}

export default Providers;
