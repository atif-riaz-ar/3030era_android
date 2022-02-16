import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    ImageBackground,
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import NoData from "../components/NoData";
import Loader from "../components/loader";

const CspList = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
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
            setLoading(false)
        }).catch(error => {
            setLoading(false)
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
                <HeaderMenu navigation={navigation} back="Home" title="CSPList"/>
                <View style={{paddingBottom: 30}}>
                    {/*CspList Loop*/}
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight
                            key={item.id}
                        >
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                                <View style={{alignSelf: "flex-start", width: "55%", marginBottom: 10}}>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{item.product_name}</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{trans('Date')}: {(item.update_time).split(" ")[0]}</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{trans('Amount')}: ${(item.total_price).split(" ")[0]}</Text>
                                </View>
                                <View style={{alignSelf: "flex-start", width: "45%", marginBottom: 10}}>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{trans('Status')}: Completed</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{trans('Due')}: {item.end_date}</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'left'}}>{trans('Quantity')}: {item.amount}</Text>
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

export default CspList;
