import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    ImageBackground, TouchableOpacity,
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Loader from "../components/loader";

const OpenCart = ({navigation, route}) => {
    let item = route.params.item;
    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const cancelOrder = () => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        p_data.append("request_cancel_id", item.id);
        setLoading(true)
        fetch(api_url + "member_purchase_api/purchaseCancel", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if(responseJson.response_json) {
                setLoading(false)
                alert(trans("OrderCancelled"));
                navigation.navigate("Open Cart");
            } else {
                alert(trans("CancelFailed"))
            }
        }).catch(error => {
            setLoading(false)
            alert(trans("CancelFailed"))
        })
    }

    return (
        <View style={{flex: 1, height: "100%"}}>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Open Cart" title="Cancel Order"/>
                <View style={{margin: 20}}>
                    {/*OpenCart Loop*/}
                    <View style={{margin: 20}}>
                        <TouchableHighlight>
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                                <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                    <Text style={{fontSize: 18, color: COLOR.white, marginTop: 2, marginBottom: 10, textAlign: 'center', textDecorationLine: 'underline'}}>Confirm Cancellation</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>Status: {item.status}</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>{item.product_name}</Text>
                                    {item.status === 'COMPELETED'?<Text style={{fontSize: 13, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>Due date: {item.end_date}</Text> : <></>}
                                    <Text style={{fontSize: 13, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>Amount: {item.total_price}</Text>
                                    <Text style={{fontSize: 13, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>Quantity: {item.amount}</Text>

                                    {item.status === 'COMPELETED'?
                                        <TouchableOpacity onPress={() => { navigation.navigate("DownloadOrder", {item: item}); }} style={{marginTop: 20, width: "50%", alignSelf: "center"}}>
                                            <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 30, fontWeight: "bold", fontSize: 13, color: COLOR.white, backgroundColor: COLOR.sky, textAlign: 'center'}}>Invoice</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={{flex: 1, flexDirection: "row", marginHorizontal: 30}}>
                                            <TouchableOpacity onPress={() => { navigation.navigate("Open Cart", {item: item}); }} style={{alignSelf: "flex-start", marginTop: 20, width: "40%"}}>
                                                <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 5, fontSize: 13, color: COLOR.white, backgroundColor: COLOR.sky, textAlign: 'center'}}>Back</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { return cancelOrder() }} style={{alignSelf: "flex-end", marginTop: 20, width: "60%"}}>
                                                <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 5, fontSize: 13, color: COLOR.white, backgroundColor: COLOR.extra_danger, textAlign: 'center'}}>Cancel Order</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default OpenCart;
