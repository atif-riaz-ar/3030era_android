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

const TeamDetail = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading}/>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <HeaderMenu navigation={navigation} back="My Team" title="MemberReferralDetail"/>
                <View style={{margin: 20, backgroundColor: COLOR.primary_color, borderRadius: 5}}>
                    {(route.params.list).length == 0 ? <NoData/> : (route.params.list).map((item, index) => (
                        <TouchableHighlight key={index}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: "wrap",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderBottomWidth: 2,
                                borderColor: 'white'
                            }}>
                                <Text style={{
                                    lineHeight: 20,
                                    flex: 0.5,
                                    fontSize: 12,
                                    color: 'white',
                                    alignSelf: "flex-start",
                                    width: Dimensions.get('window').width / 2 - 70
                                }}>
                                    {item.username} {"\n"}
                                    {trans('SponsoredBy')}: {item.sponsorId} {"\n"}
                                    {trans('Sponsored')}: {item.count}
                                </Text>
                                <Text style={{
                                    lineHeight: 20,
                                    flex: 0.5,
                                    fontSize: 12,
                                    color: 'white',
                                    alignSelf: "flex-end",
                                    width: Dimensions.get('window').width / 2 - 70
                                }}>
                                    {item.join_date} {"\n"}
                                    {"\n"}
                                    {trans("PersonalPurchase")} {item.purchase}
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

export default TeamDetail;
