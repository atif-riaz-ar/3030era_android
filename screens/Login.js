import React, {useState, useContext} from "react";
import {
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
} from "react-native";
import styles from "../styles/login";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import Svg, {Path} from "react-native-svg";
import Flag from 'react-native-flags';
import Loader from "../components/loader";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({navigation}) => {
    const {login,appVars, trans, setAppLanguage} = useContext(AuthContext);
    let [userData, setUserData] = useState([]);
    let [userEmail, setUserEmail] = useState("");
    let [userPassword, setUserPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState("");

    const processLogin = async () => {
        setErrortext("");
        if (!userEmail) { alert(trans("FillEmail")); return;}
        if (!userPassword) { alert(trans("FillPassword")); return;}
        setLoading(true);
        const fcmToken = await AsyncStorage.getItem("fcmToken");
        var data = new FormData();
        data.append("build_number", '1.0');
        data.append("app_id", app_id);
        data.append("security_key", appVars.sky);
        data.append("os", 'android');
        data.append("username", userEmail);
        data.append("password", userPassword);
        data.append("device_token", fcmToken);

        fetch(api_url + "member_api/login", {
            method: "POST",
            body: data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            // console.log(responseJson.response_data);
            if(responseJson.message){
                setErrortext(responseJson.message);
                setLoading(false);
            } else {
                if ((responseJson.response_data.username).toLowerCase() == userEmail.toLowerCase()){
                    login(navigation, responseJson.response_data);
                }
            }
        }).catch(error => {
            // console.log(error);
            setLoading(false);
            setErrortext(trans("TryAgain"));
        });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ImageBackground
                source={require("../images/background_login.jpg")}
                style={styles.bg_image}
            />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View contentContainerStyle={{justifyContent: "center", marginTop: 100}}>
                    <KeyboardAvoidingView enabled>
                        <View style={{alignItems: "center"}}>
                            <Image source={require("../images/logo.png")} style={styles.logo}/>
                        </View>
                        <View style={{
                            borderRadius: 50,
                            width: 80,
                            height: 80,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            alignSelf:'center',
                            backgroundColor: '#48A2C2',
                            zIndex: 1
                        }}>

                            <Svg viewBox="0 0 496 512" width="60" height="60">
                                <Path
                                    fill="white"
                                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                                />
                            </Svg>

                        </View>

                        <View style={{
                            borderRadius: 30,
                            paddingTop: 50,
                            paddingBottom: 25,
                            paddingHorizontal: 20,
                            marginHorizontal: 20,
                            marginTop: -50,
                            marginBottom: 20,
                            backgroundColor: '#11346a'}}>
                            <View style={[styles.SectionStyle, {marginBottom: 10, alignItems:'center', marginLeft: 'auto', marginRight: 'auto',  }]}>
                                <Text style={{color: 'white', fontSize: 18}}>{trans("MemberLogin")}</Text>
                                <TouchableOpacity onPress={() => { setAppLanguage('si_cn') }}><Flag code="CN" size={32} style={{marginHorizontal: 4}} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => { setAppLanguage('en') }}><Flag code="US" size={32} /></TouchableOpacity>
                            </View>
                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={userEmail => setUserEmail(userEmail)}
                                    value={userEmail}
                                    placeholder={trans('Username')}
                                    placeholderTextColor="#a3a3a3"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder={trans('Password')}
                                    onChangeText={userPassword => setUserPassword(userPassword)}
                                    value={userPassword}
                                    placeholderTextColor="#a3a3a3"
                                    keyboardType="default"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                />
                            </View>
                            {errortext != "" ? (
                                <Text style={styles.errorTextStyle}> {errortext} </Text>
                            ) : null}
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate("ResetPassword")}>
                                <Text style={styles.buttonTextStylePlain}>{trans("ForgotPassword")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonStyle, {alignSelf: 'center', width: 150}]}
                                activeOpacity={0.5}
                                onPress={processLogin}>
                                <Text style={[styles.buttonTextStyle]}>
                                    {trans("Login")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};

export default Login;

