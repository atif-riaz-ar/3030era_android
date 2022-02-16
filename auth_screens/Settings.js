import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground, Linking,
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Svg, {Path} from "react-native-svg";
import Loader from "../components/loader";

const Settings = ({navigation, route}) => {

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
                setIsLang(false);
                login(false, responseJson.response_data);
                setLoading(false);
            }
        }).catch(error => {
        });
    }

    const {user, appVars, trans, login, setAppLanguage} = useContext(AuthContext);
    const [isLang, setIsLang] = useState(false);
    let [loading, setLoading] = useState(false);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <HeaderMenu navigation={navigation} back="Home" title="Settings"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                        <TouchableOpacity onPress={() => { navigation.navigate('My Team') }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('MyTeam')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Genealogy Tree') }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('GenealogyTree')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Change Password') }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('ChangePassword')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('Security Password') }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('SecurityPassword')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsLang(true); }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('ChangeLanguage')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Linking.canOpenURL("https://m.3030era.com.sg/ff/uploads/3030ERA_TERMS.pdf").then(supported => {
                                if (supported) {
                                    Linking.openURL("https://m.3030era.com.sg/ff/uploads/3030ERA_TERMS.pdf");
                                }
                            });
                        }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('3030eraTerms')}</Text></View></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Linking.canOpenURL("https://m.3030era.com.sg/ff/uploads/CSP_AGREEMENT.pdf").then(supported => {
                                if (supported) {
                                    Linking.openURL("https://m.3030era.com.sg/ff/uploads/CSP_AGREEMENT.pdf");
                                }
                            });
                        }}><View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}><Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>{trans('CSPAgreement')}</Text></View></TouchableOpacity>
                </View>
            </ScrollView>

            { isLang?
                <>
                    <TouchableOpacity onPress={() => {setIsLang(false);}} style={{marginTop: "-250%", height: "400%", paddingVertical: 10, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%',}}>
                            <Text> </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{paddingVertical: 10, flex: 0.13, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{position:"absolute", left: "0%", height: "100%", width: '100%'}}>
                            <TouchableOpacity style={{backgroundColor: COLOR.primary_color, position:"absolute", bottom: 85, height: 50, width: '100%', borderBottomWidth: 2, borderColor: "white"}}>
                                <Text style={{textAlign:"center", height: "100%", fontSize: 18, fontWeight: "bold", lineHeight: 50, paddingHorizontal: 20, color: "white"}}>{trans('ChangeLaguage')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setLanguageSetting('en')}} style={{backgroundColor: COLOR.primary_color, position:"absolute", bottom: 35, height: 50, width: '100%'}}>
                                <Text style={{textAlign:"left", height: "100%", fontSize: 15, lineHeight: 50, paddingHorizontal: 20, color: "white"}}>{trans('English')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setLanguageSetting('si_cn')}} style={{backgroundColor: COLOR.primary_color, position:"absolute", bottom: -15, height: 50, width: '100%'}}>
                                <Text style={{textAlign:"left", height: "100%", fontSize: 15, lineHeight: 50, paddingHorizontal: 20, color: "white"}}>{trans('Chinese')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
                : <BottomMenu navigation={navigation}/>
            }
        </View>
    );
}

export default Settings;
