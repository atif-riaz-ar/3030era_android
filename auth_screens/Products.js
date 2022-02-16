import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
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
import Loader from "../components/loader";
import NoData from "../components/NoData";

const CspList = ({navigation, route}) => {

    const {user, appVars} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        setLoading(true);
        fetch(api_url + "member_purchase_api/getEcProds", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setLoading(false);
            setList(responseJson);
        }).catch(error => {
            setLoading(false);
        })
    }, []);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Home" title="Products"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight key={index}>
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginVertical: 3, padding: 8, borderBottomWidth: 2, borderColor: 'white'}}>
                                <Text style={{fontSize: 13, color: 'white', alignSelf: "flex-start", width: Dimensions.get('window').width - 140, alignItems:'center'}}>
                                    {item.name}
                                </Text>
                                <Text style={{fontSize: 13, color: 'white', alignSelf: "flex-end", width: 70, alignItems:'center'}}>
                                    {(Math.round(item.points * 100) / 100).toFixed(2)} PV
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default CspList;
