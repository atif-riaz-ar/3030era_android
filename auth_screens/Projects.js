import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableHighlight, View, ImageBackground, TouchableOpacity} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Loader from "../components/loader";
import NoData from "../components/NoData";

const CspList = ({navigation, route}) => {
    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_purchase_api/get_product", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setList((responseJson.response_data).reverse());
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        });
    }, [list]);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Home" title="Projects"/>
                <View style={{margin: 20}}>
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight key={item.id}>
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                                <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                    <Text style={{fontSize: 15, color: COLOR.white, fontWeight: "bold", marginBottom: 5, textAlign: 'left'}}>{trans(item.subscription_day+"days")}</Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginVertical: 5, textAlign: 'left'}}>{item.name}</Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginVertical: 5, textAlign: 'left'}}>{item.description} </Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginVertical: 5, marginBottom: 10, textAlign: 'left'}}>{trans('FeedPerFish')}: {item.unit_price}</Text>
                                    <TouchableOpacity onPress={() => {navigation.navigate("BuyProject", {item: item});}}>
                                        <Text style={{borderRadius: 5, paddingVertical: 5, marginHorizontal: "20%", fontWeight: "bold", fontSize: 15, color: COLOR.white, backgroundColor: COLOR.sky, textAlign: 'center'}}>{trans('Buy')}</Text>
                                    </TouchableOpacity>
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
