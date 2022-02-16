import React, {useState, useEffect, useContext} from 'react';
import {View, Image} from 'react-native';
import styles from '../styles/splash';
import {AuthContext} from '../app_config/AuthProvider';
import {api_url, app_id} from "../globals/vars";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const Splash = ({navigation}) => {
    const {user, login, app_settings, appVars, setAppLanguage} = useContext(AuthContext);

    useEffect(() => {
        AsyncStorage.getItem('app_lang').then((lng) => {
            setAppLanguage(lng);
            AsyncStorage.getItem('user').then((usr) => {
                usr = JSON.parse(usr);
                if (usr == null) {
                    axios.get(api_url + "basic_api/get_security_key", {build_number: '1.0', app_id: app_id, os: 'android'}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then(function (response) {
                        if (response.data.response_data != 'undefined') {
                            let Vars = {
                                sky: response.data.response_data.security_key,
                                app_id: app_id
                            };
                            AsyncStorage.setItem("Vars", JSON.stringify(Vars)).then(() => {
                                app_settings(Vars);
                                navigation.navigate('Login');
                            });
                        } else {
                            alert("Technical issue. Please try again.");
                        }
                    }).catch(function (error) {
                        // console.error(error);
                    });
                } else {

                    var data = new FormData();
                    data.append("build_number", '1.0');
                    data.append("app_id", app_id);
                    data.append("security_key", appVars.sky);
                    data.append("os", 'android');
                    data.append("username", usr.username);
                    data.append("password", "cck..win..888");

                    fetch(api_url + "member_api/login", {
                        method: "POST",
                        body: data,
                        headers: new Headers({
                            'Content-Type': 'multipart/form-data'
                        }),
                    }).then((responseData) => {
                        return responseData.json();
                    }).then(responseJson => {
                        login(navigation, responseJson.response_data);
                    }).catch(error => {
                    });
                }
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <Image style={{width: "30%"}} resizeMode={'contain'} source={require('../images/logo.png')}/>
        </View>
    );
};

export default Splash;
