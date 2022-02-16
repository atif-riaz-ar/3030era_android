import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import * as COLOR from '../styles/constants';
import {AuthContext} from "../app_config/AuthProvider";

const Menu = (props) => {

    const {user} = useContext(AuthContext);

    return (
        <View style={{
            marginVertical: 8,
            paddingVertical: 8,
            backgroundColor: COLOR.primary_color,
            flex: 1
        }}>
            <View onPress={() => props.nav.navigate(props.title)} style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: 'bold',
                    paddingLeft: 12,
                    color: COLOR.white
                }}>{user.username}</Text>
            </View>
        </View>
    );
};

export default Menu;