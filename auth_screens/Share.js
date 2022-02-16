import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Clipboard,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import QRCode from 'react-native-qrcode-svg';
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";

const Share = ({navigation, route}) => {
    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [copiedText, setCopiedText] = useState('');

    const copyToClipboard = () => {
        Clipboard.setString("https://m.3030era.com.sg/u/"+ user.username)
    }

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_purchase_api/getAllCartCompleted", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setList(responseJson);
        }).catch(error => {
        })
    }, []);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Home" title="Share"/>
                <View style={{paddingBottom: 30}}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, borderRadius: 5, padding: 10}}>
                        <View style={{alignSelf: "flex-start", width: "100%", alignItems:'center'}}>
                            <Text style={{fontSize: 18, color: COLOR.white, marginBottom: 30, textAlign: 'center'}}>
                                https://m.3030era.com.sg/u/{user.username}
                            </Text>
                            <QRCode
                                backgroundColor={COLOR.primary_color}
                                color={COLOR.white}
                                value={"https://m.3030era.com.sg/u/"+ user.username}
                                size={250}
                            />

                            <TouchableOpacity onPress={() => copyToClipboard()}>
                                <Text style={{borderRadius: 5, paddingVertical: 10, paddingHorizontal:30, marginTop: 30, fontWeight: "bold", fontSize: 18, color: COLOR.white, backgroundColor: COLOR.sky, textAlign: 'center'}}>{trans('CopyClipboard')}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Share;
