import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    ImageBackground, TouchableOpacity,
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Loader from "../components/loader";

const MyTeam = ({navigation, route}) => {
    const {user, appVars, login, trans, setAppLanguage} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(false);

    const setLanguageSetting = (lang) => {
        setLoading(true);
        var data = new FormData();
        data.append("build_number", '1.0');
        data.append("app_id", app_id);
        data.append("security_key", appVars.sky);
        data.append("os", 'android');
        data.append("language", lang);

        setAppLanguage(lang);

        fetch(api_url + "member_profile_api/update_language", {
            method: "POST",
            body: data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if (responseJson.response_data) {
                setLoading(false);
                login(navigation, responseJson.response_data);
            }
        }).catch(error => {
        });
    }

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Settings" title="ChangeLanguage"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                    <View style={{flex: 1, flexDirection: "row", marginHorizontal: 30}}>
                        <TouchableOpacity onPress={() => {setLanguageSetting('en')}} style={{}}>
                            <Text style={{}}>{trans('English')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: "row", marginHorizontal: 30, marginBottom: 30}}>
                        <TouchableOpacity onPress={() => {setLanguageSetting('si_cn')}} style={{}}>
                            <Text style={{}}>{trans('Chinese')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default MyTeam;
