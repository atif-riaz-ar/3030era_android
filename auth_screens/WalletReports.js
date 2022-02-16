import React, {useContext, useState} from 'react';
import {
    ScrollView,
    Text,
    Picker,
    View,
    ImageBackground,
    TouchableHighlight
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {api_url, app_id} from "../globals/vars";
import {AuthContext} from "../app_config/AuthProvider";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import Loader from "../components/loader";
import NoData from "../components/NoData";

const Reports = ({navigation, route}) => {
    const {user, appVars, trans} = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    let month_val = [];
    let month_key = [];

    var theMonths = [trans('January'), trans('February'), trans('March'), trans('April'), trans('May'), trans('June'), trans('July'), trans('August'), trans('September'), trans('October'), trans('November'), trans('December')];
    var now = new Date();

    for (var i = 0; i < 12; i++) {
        var future = new Date(now.getFullYear(), now.getMonth() - i, 1);
        var month = theMonths[future.getMonth()];
        var year = future.getFullYear();
        month_val.push(month + " " + year);
        month_key.push(year+"-"+(future.getMonth()+1)+"-01");
    }

    const updateValue = (period) => {
        setSelectedValue(period)
        if(period == "") {
            setList([]);
            return false
        }
        setLoading(true);
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        p_data.append("last_id", 0);
        p_data.append("period_from", period);
        fetch(api_url + "member_transaction_api/viewTransactionHistory", {
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

    }

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading}/>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Reports" title="Wallet Report"/>
                <View style={{paddingBottom: 30}}>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.black, borderRadius: 5, padding: 10}}>
                        <View style={{width: "100%"}}>
                            <Picker
                                style={{width: "100%", color: "white", height: 28, backgroundColor: COLOR.sky}}
                                itemStyle={{height: 28}}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateValue(itemValue)
                                }}
                            >
                                <Picker.Item color={COLOR.header}key="-1" value="" label={trans("PleaseSelect")} />
                                {month_key.map((item, index) => (
                                    <Picker.Item color={COLOR.header}key={index} value={month_key[index]} label={month_val[index]} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15}}>
                        <View style={{width: "100%"}}>
                            {list.length == 0 ? <NoData/> : list.map((item, index) => {
                                return (
                                    <TouchableHighlight
                                        key={item.id}
                                    >
                                        <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 5, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('DateTime')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{item.insert_time}</Text>
                                            </View>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('WalletType')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('GilPoints')}</Text>
                                            </View>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('Description')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans(item.description)}</Text>
                                            </View>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('CreditIn')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{item.credit}</Text>
                                            </View>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('CreditOut')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{item.debit}</Text>
                                            </View>
                                            <View style={{alignSelf: "flex-start", width: "32%", marginBottom: 10}}>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{trans('Balance')}</Text>
                                                <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10, textAlign: 'center'}}>{item.balance}</Text>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            )}

                        </View>
                    </View>

                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Reports;
