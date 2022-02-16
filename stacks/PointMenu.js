import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import * as COLOR from '../styles/constants';
import {AuthContext} from "../app_config/AuthProvider";

const Menu = (props) => {

    const {user, trans} = useContext(AuthContext);

    return (
        <View style={{
            marginVertical: 4,
            paddingVertical: 4,
            backgroundColor: COLOR.light_bg,
            flex: 1
        }}>
            <View onPress={() => props.nav.navigate(props.title)} style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 13,
                    paddingLeft: 12,
                    color: COLOR.light_color
                }}>{trans("GilPoints")}</Text>
            </View>
            <View onPress={() => props.nav.navigate(props.title)} style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 15,
                    paddingLeft: 12,
                    color: COLOR.primary_color
                }}>{user == null? 0 : user.comm_earn}</Text>
            </View>
        </View>
    );
};

export default Menu;