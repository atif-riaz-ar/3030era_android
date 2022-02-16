import React, {useContext} from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import * as COLOR from '../styles/constants';
import {AuthContext} from "../app_config/AuthProvider";

const Menu = (props) => {
    const {user, trans} = useContext(AuthContext);
    return (
        <View style={{
            marginVertical: 8,
            paddingVertical: 8,
            backgroundColor: COLOR.primary_color,
            flex: 1
        }}>
            <TouchableOpacity onPress={() => {
                Linking.canOpenURL("https://ec3030.com").then(supported => {
                    if (supported) {
                        Linking.openURL("https://ec3030.com");
                    }
                });
            }} style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 13,
                    paddingLeft: 12,
                    color: COLOR.white
                }}>{trans('Access')} ec3030.com</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;