import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    View,
} from 'react-native';
import {AuthContext} from "../app_config/AuthProvider";
import * as COLOR from '../styles/constants';

const NoData = ({navigation, route}) => {

    const {user, appVars} = useContext(AuthContext);
    const [list, setList] = useState([]);

    return (
        <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
            <View style={{flex: 1, padding: 8}}>
                <Text style={{fontSize: 14, color: 'white', width: "100%"}}>
                    No Data Available
                </Text>
            </View>
        </View>
    );
}

export default NoData;
