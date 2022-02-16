import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    ImageBackground
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import Loader from "../components/loader";
import TreeView from "../tree";

const MyTeam = ({navigation, route}) => {

    const {user, appVars} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);

        fetch(api_url + "member_profile_api/get_target_level", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setList(responseJson);
            setLoading(false);
        }).catch(error => {
            console.error(error)
        })
    }, []);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}>
                <HeaderMenu navigation={navigation} back="Settings" title="GenealogyTree"/>
                <View style={{margin: 20, borderRadius: 5}}>
                    <TreeView data={list}/>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default MyTeam;
