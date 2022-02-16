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

const Login = ({navigation}) => {
    const {login,appVars, trans, setAppLanguage} = useContext(AuthContext);
    let [userData, setUserData] = useState([]);
    let [otp, setOtp] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState(false);
    let [errortext, setErrortext] = useState("");

    const processReset = () => {
        setErrortext("");
        if (!otp) { alert(trans("optError")); return;}
        if (!password) { alert(trans("NewError")); return;}
        if (!confirm) { alert(trans("ConError")); return;}
        if (confirm !== password) { alert(trans("NCError")); return;}

        setLoading(true);

        var data = new FormData();
        data.append("build_number", '1.0');
        data.append("app_id", app_id);
        data.append("security_key", appVars.sky);
        data.append("os", 'android');
        data.append("password", password);
        data.append("otp", otp);

        fetch(api_url + "member_api/reset_password", {
            method: "POST",
            body: data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if (responseJson.response_data) {
                alert(responseJson.response_data);
                navigation.navigate('Login')
            }
            if (responseJson.message) {
                alert(responseJson.message);
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            setErrortext(trans("TryAgain"));
        });
    };

    return (
        <View style={styles.mainBody}>
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
                            borderRadius: 30,
                            paddingTop: 30,
                            paddingBottom: 25,
                            paddingHorizontal: 20,
                            marginHorizontal: 20,
                            marginBottom: 20,
                            backgroundColor: '#11346a'}}>
                            <View style={[styles.SectionStyle, {marginBottom: 10, alignItems:'center', marginLeft: 'auto', marginRight: 'auto',  }]}>
                                <Text style={{color: 'white', fontSize: 18}}>{trans("LostPassword")}</Text>
                                <TouchableOpacity onPress={() => { setAppLanguage('si_cn') }}><Flag code="CN" size={32} style={{marginHorizontal: 4}} /></TouchableOpacity>
                                <TouchableOpacity onPress={() => { setAppLanguage('en') }}><Flag code="US" size={32} /></TouchableOpacity>
                            </View>
                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={otp => setOtp(otp)}
                                    value={otp}
                                    placeholder={trans('otp')}
                                    placeholderTextColor="#a3a3a3"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={password => setPassword(password)}
                                    value={password}
                                    placeholder={trans('Password')}
                                    placeholderTextColor="#a3a3a3"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    blurOnSubmit={false}
                                />
                            </View>
                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={confirm => setConfirm(confirm)}
                                    value={confirm}
                                    placeholder={trans('ConfirmPassword')}
                                    placeholderTextColor="#a3a3a3"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    blurOnSubmit={false}
                                />
                            </View>

                            <Text style={styles.buttonTextStylePlain}>{trans("OTPMessage")}</Text>
                            {errortext != "" ? (
                                <Text style={styles.errorTextStyle}> {errortext} </Text>
                            ) : null}
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.buttonTextStylePlain}>{trans("AccountAlready")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonStyle, {alignSelf: 'center', width: 150}]}
                                activeOpacity={0.5}
                                onPress={processReset}>
                                <Text style={[styles.buttonTextStyle]}>
                                    {trans("Submit")}
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

