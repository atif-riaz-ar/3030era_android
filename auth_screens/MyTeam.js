import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import NoData from "../components/NoData";
import Loader from "../components/loader";

const MyTeam = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [direct, setDirect] = useState(0);
    const [total, setTotal] = useState(0);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_profile_api/getMemberDownline", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setTotal(responseJson.total);
            setDirect(responseJson.direct);
            setList(responseJson.list);
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        })
    },[]);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <HeaderMenu navigation={navigation} back="Settings" title="MyTeam"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", paddingHorizontal: 10, paddingVertical: 12}}>
                        <Text style={{ textAlign:"center", flex: 0.5, fontSize: 15, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width/2 - 69, borderRightWidth: 2, borderRightColor: 'white' }}>
                            {direct} {"\n"} {trans('TotalDirect')}
                        </Text>
                        <Text style={{ textAlign:"center", flex: 0.5, fontSize: 15, color: 'white', alignSelf: "flex-end", width: Dimensions.get('window').width/2 - 69 }}>
                            {total} {"\n"} {trans('TotalMembers')}
                        </Text>
                    </View>
                </View>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight key={index}>
                            <TouchableOpacity onPress={() => {navigation.navigate("Team Detail", {level: item.level, members: item.members})}}>
                                <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", paddingHorizontal: 10, paddingVertical: 12, borderBottomWidth: 2, borderColor: 'white'}}>
                                    <Text style={{flex: 0.5, fontSize: 15, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width/2 - 70 }}>
                                        {trans('Level')}: {item.level}
                                    </Text>
                                    <Text style={{flex: 0.5, fontSize: 15, color: 'white', alignSelf: "flex-end", width: Dimensions.get('window').width/2 - 70 }}>
                                        {item.total_member}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default MyTeam;
