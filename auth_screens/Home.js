import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    Image,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import Svg, {Path} from "react-native-svg";
import {AuthContext} from "../app_config/AuthProvider";
import BottomMenu from "../stacks/BottomMenu";
import Loader from "../components/loader";

const Home = ({navigation, route}) => {
    const {user, trans} = useContext(AuthContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}>
                <View style={{ flex :1, flexDirection: "row", flexWrap: "wrap", height: 70, width: "100%", padding: 10, backgroundColor: COLOR.primary_color}}>
                    <TouchableOpacity style={{alignSelf: "flex-start", width: 32, margin: 10}} onPress={() => navigation.toggleDrawer()}>
                        <Svg viewBox="0 0 512 512" width="30" height="30">
                            <Path fill="white" d="M467 61H165c-24.82 0-45 20.19-45 45 0 24.82 20.18 45 45 45h302c24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45zM467 211H165c-24.82 0-45 20.19-45 45 0 24.82 20.18 45 45 45h302c24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45zM467 361H165c-24.82 0-45 20.19-45 45 0 24.82 20.18 45 45 45h302c24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45zM45 61C20.18 61 0 81.19 0 106c0 24.82 20.18 45 45 45 24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45zM45 211c-24.82 0-45 20.19-45 45 0 24.82 20.18 45 45 45 24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45zM45 361c-24.82 0-45 20.19-45 45 0 24.82 20.18 45 45 45 24.81 0 45-20.18 45-45 0-24.81-20.19-45-45-45z"/>
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf: "flex-end", width: 120, marginRight: 20, marginTop: -48}} onPress={() => navigation.navigate("Open Cart")}>
                        <Text style={styles.open_cart_btn}>
                            {trans('OpenCart')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {/*Gil Points Area*/}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        margin: 15,
                        marginVertical: 15,
                        backgroundColor: COLOR.primary_color,
                        borderRadius: 5,
                        padding: 15,
                        paddingBottom: 0
                    }}>
                        <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                            <Text style={{fontSize: 14, color: COLOR.white}}>{trans('GilPoints')}</Text>
                        </View>
                        <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                            <Text style={{
                                fontSize: 20,
                                color: COLOR.white,
                                fontWeight: "bold"
                            }}>{user == null ? 0 : user.comm_earn}</Text>
                        </View>
                        <View style={{
                            alignSelf: "flex-start",
                            width: "100%",
                            marginTop: 0,
                            marginBottom:10,
                            borderWidth: 1,
                            borderColor: 'white'
                        }}></View>
                        <TouchableOpacity onPress={() => {navigation.navigate("Announcement")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico1.gif')}/>
                            <Text
                                style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('Announcement')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate("Reports")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico2.gif')}/>
                            <Text style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('Reports')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate("Withdrawal")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico3.gif')}/>
                            <Text style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('Withdrawals')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate("CSP List")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico4.gif')}/>
                            <Text style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('CSPList')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate("CSP Cert")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico5.gif')}/>
                            <Text style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('CSPCertificate')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate("Share")}} style={{
                            alignSelf: "flex-start",
                            alignItems: 'center',
                            width: "33%",
                            marginBottom: 30
                        }}>
                            <Image style={styles.logo} resizeMode={'contain'}
                                   source={require('../images/ico6.jpg')}/>
                            <Text style={{textAlign: "center", fontSize: 13, color: COLOR.white}}>{trans('Share')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/*Expiry Area*/}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        margin: 10,
                        backgroundColor: COLOR.primary_color,
                        borderRadius: 5,
                        padding: 10
                    }}>
                        <View style={{alignSelf: "flex-start", width: "100%"}}>
                            <Text style={{
                                fontSize: 13,
                                color: COLOR.white,
                                textAlign: 'center'
                            }}>{user == null ? "-" : trans('ec3030Expiry') + ': ' + user.eticket_expiry}</Text>
                        </View>
                    </View>

                    {/*Purchase Date Area*/}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        margin: 10,
                        backgroundColor: COLOR.primary_color,
                        borderRadius: 5,
                        padding: 10
                    }}>
                        <View style={{alignSelf: "flex-start", width: "100%"}}>
                            <Text style={{
                                fontSize: 13,
                                color: COLOR.white,
                                textAlign: 'center'
                            }}>{user == null ? "-" : trans('TotalPurchased') + ': ' + user.total_purchased}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Home;
