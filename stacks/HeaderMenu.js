import React, {useContext} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import * as COLOR from '../styles/constants';
import Svg, {Path, Circle} from "react-native-svg";
import {AuthContext} from "../app_config/AuthProvider";

const HeaderMenu = (props) => {
    const {user, trans} = useContext(AuthContext);
    return (
        <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", paddingVertical: 10, backgroundColor: COLOR.header}}>
            <TouchableOpacity onPress={() => props.navigation.navigate(props.back)} style={{alignSelf: "flex-start", width: 40, margin: 10, padding: 5}}>
                <Svg width="30" height="30" viewBox="0 0 448 512">
                    <Path fill="white" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/>
                </Svg>
            </TouchableOpacity>
            <View style={{alignSelf: "flex-end", width: Dimensions.get('window').width - 100, margin: 10}}>
                <Text style={{textAlign: "center", fontSize: 22, color: "white", fontWeight: "bold", marginLeft: -40, marginTop: -30}}>{trans(props.title)}</Text>
            </View>
        </View>
    );
};

export default HeaderMenu;