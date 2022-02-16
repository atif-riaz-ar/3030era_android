import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    ImageBackground,
    Dimensions
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import RenderHtml from 'react-native-render-html';
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import NoData from "../components/NoData";
import Loader from "../components/loader";

const Announcement = ({navigation, route}) => {

    const {user, appVars} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_message_api/get_news_web", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            })
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setList(responseJson.response_data);
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    },[]);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Home" title="Announcement"/>
                <View style={{paddingBottom: 30}}>
                    <Loader loading={loading} />
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight
                            key={item.id}
                        >
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10,}}>
                                <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10}}>{item.insert_time}</Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginBottom: 10}}>{item.title}</Text>
                                    <RenderHtml
                                        contentWidth={Dimensions.get('window').width - 60}
                                        source={{html: "<div style='color: rgb(255,255,255); font-size: 12px'>" + item.contents + "</div>"}}
                                        style={{width: "100%"}}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Announcement;
