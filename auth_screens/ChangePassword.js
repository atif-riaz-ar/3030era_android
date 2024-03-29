import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, ImageBackground, TextInput, Keyboard, TouchableOpacity,} from 'react-native';
import styles from "../styles/login";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Loader from "../components/loader";

const MyTeam = ({navigation, route}) => {

    const {login,appVars, trans} = useContext(AuthContext);
    let [newPassword, setNewPassword] = useState("");
    let [oldPassword, setOldPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState("");

    const processForm = () => {
        setErrortext("");
        if (!oldPassword) { alert(trans("OldError")); return;}
        if (!newPassword) { alert(trans("NewError")); return;}
        if (!confirmPassword) { alert(trans("ConError")); return;}
        if (confirmPassword !== newPassword) { alert(trans("NCError")); return;}
        if(newPassword.length < 8){alert(trans("Min8Pass")); return;}
        if(!(/(?=.*[@!#\$\^%&*()+=\-\[\]\\\';,\.\/\{\}\|\":<>\? ]+?).*[^_\W]+?.*/).test(newPassword)){alert(trans("PassValidation")); return;}

        setLoading(true);
        var data = new FormData();
        data.append("build_number", '1.0');
        data.append("app_id", app_id);
        data.append("security_key", appVars.sky);
        data.append("os", 'android');
        data.append("old_password", oldPassword);
        data.append("password", newPassword);
        data.append("password_comfirm", confirmPassword);

        fetch(api_url + "member_profile_api/update_password", {
            method: "POST",
            body: data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if(responseJson.message){
                setErrortext(responseJson.message);
            }
            if(responseJson.response_data){
                alert('Updated Successfully..!!');
                setNewPassword("");
                setOldPassword("");
                setConfirmPassword("");
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    };

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Settings" title="Password"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>

                    <View style={{
                        borderRadius: 30,
                        paddingVertical: 50,
                        paddingHorizontal: 20,
                        marginHorizontal: 20,
                        marginVertical: 20,
                        backgroundColor: '#11346a'}}>
                        <View style={style.SectionStyle}>
                            <TextInput
                                style={style.inputStyle}
                                placeholder={trans('OldPassword')} //12345
                                onChangeText={oldPassword => setOldPassword(oldPassword)}
                                value={oldPassword}
                                placeholderTextColor="#a3a3a3"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={style.SectionStyle}>
                            <TextInput
                                style={style.inputStyle}
                                placeholder={trans('NewPassword')} //12345
                                onChangeText={newPassword => setNewPassword(newPassword)}
                                value={newPassword}
                                placeholderTextColor="#a3a3a3"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={style.SectionStyle}>
                            <Text style={style.requirement}>{trans('PassCheckInForm')}</Text>
                        </View>
                        <View style={style.SectionStyle}>
                            <TextInput
                                style={style.inputStyle}
                                placeholder={trans('ConfirmPassword')} //12345
                                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                                value={confirmPassword}
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
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={processForm}>
                            <Text style={[styles.buttonTextStyle]}>
                                {trans('ChangePassword')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

const style = StyleSheet.create({
    inputStyle: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: "100%",
        height: 34,
        fontSize: 12,
        color: "white",
        paddingVertical: 0,
        marginVertical: 0
    },
    requirement: {
        color: "white",
        fontSize: 11,
    },
    SectionStyle: {
        flexDirection: 'row',
        margin: 5,
    }
});

export default MyTeam;
