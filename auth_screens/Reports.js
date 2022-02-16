import React, {useContext, useState} from 'react';
import {
    ScrollView,
    Text,
    Image,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import Svg, {Path} from "react-native-svg";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import {AuthContext} from "../app_config/AuthProvider";


const Reports = ({navigation, route}) => {
    const {user, trans} = useContext(AuthContext);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Home" title="Reports"/>
                <View style={{paddingBottom: 30}}>
                    {/*Reports Loop*/}
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10,}}>
                        <View style={{width: "100%"}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Withdrawal Reports")} style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", width: "100%", paddingBottom:10, borderColor: "white", borderBottomWidth: 2}}>
                                <View style={{alignSelf: "flex-start", width: Dimensions.get('window').width-100}}>
                                    <Text style={{fontSize: 13, color: COLOR.white}}>
                                        {trans('WithdrawalReports')}
                                    </Text>
                                </View>
                                <View style={{alignSelf: "flex-end", width: 35}}>
                                    <Svg height="17" width="17" viewBox="0 0 256 512">
                                        <Path fill="white" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Wallet Reports")} style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", width: "100%", paddingVertical:10, borderColor: "white", borderBottomWidth: 2}}>
                                <View style={{alignSelf: "flex-start", width: Dimensions.get('window').width-100}}>
                                    <Text style={{fontSize: 13, color: COLOR.white}}>
                                        {trans('WalletReports')}
                                    </Text>
                                </View>
                                <View style={{alignSelf: "flex-end", width: 35}}>
                                    <Svg height="17" width="17" viewBox="0 0 256 512">
                                        <Path fill="white" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Bonus Reports")} style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", width: "100%", paddingTop: 10}}>
                                <View style={{alignSelf: "flex-start", width: Dimensions.get('window').width-100}}>
                                    <Text style={{fontSize: 13, color: COLOR.white}}>
                                        {trans('BonusReports')}
                                    </Text>
                                </View>
                                <View style={{alignSelf: "flex-end", width: 35}}>
                                    <Svg height="17" width="17" viewBox="0 0 256 512">
                                        <Path fill="white" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Reports;
