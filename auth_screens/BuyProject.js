import React, {useContext, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions, TextInput, Picker
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import NumericInput from 'react-native-numeric-input'
import {extra_color1} from "../styles/constants";
import Loader from "../components/loader";


const BuyProject = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext)
    let item = route.params.item;
    let [errorText, setErrorText] = useState("");
    let [quantity, setQuantity] = useState(50);
    let [loading, setLoading] = useState(50);

    const submitBuyRequest = () => {
        setLoading(true);
        setErrorText("");
        if (quantity % 50 !== 0) {
            setErrorText(trans("QuantityError"));
            return false
        }

        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        p_data.append("quantity", quantity);
        p_data.append("product_id", item.id);

        fetch(api_url + "member_purchase_api/buyProduct", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if (responseJson.response_json) {
                setQuantity(50);
                setErrorText(trans('Submitted'));
                setTimeout(() => {
                    navigation.navigate('Open Cart')
                }, 1000);
            } else {
                setErrorText(trans('SubmitFailed'));
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            return false;
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
                <HeaderMenu navigation={navigation} back="Projects" title="BuyProject"/>
                <View style={{paddingBottom: 30}}>
                    {/*BuyProject Loop*/}

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        marginTop: 10,
                        marginHorizontal: 15,
                        backgroundColor: COLOR.primary_color,
                        borderRadius: 5,
                        padding: 15
                    }}>
                        <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                            <Text style={{
                                fontSize: 15,
                                color: COLOR.white,
                                fontWeight: "bold",
                                marginBottom: 5,
                                textAlign: 'left'
                            }}>{trans(item.subscription_day + "days")}</Text>
                            <Text style={{
                                fontSize: 15,
                                color: COLOR.white,
                                marginVertical: 5,
                                textAlign: 'left'
                            }}>{item.name}</Text>
                            <Text style={{
                                fontSize: 15,
                                color: COLOR.white,
                                marginVertical: 5,
                                textAlign: 'left'
                            }}>{item.description} </Text>
                            <Text style={{
                                fontSize: 15,
                                color: COLOR.white,
                                marginVertical: 5,
                                marginBottom: 10,
                                textAlign: 'left'
                            }}>{trans('FeedPerFish')}: {item.unit_price}</Text>
                            <View style={{alignItems: "center", justifyContent: 'center', marginVertical: 30}}>

                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: COLOR.white,
                                    marginVertical: 10,
                                    textAlign: 'left'
                                }}>{trans('Quantity')}</Text>
                                <NumericInput
                                    value={quantity}
                                    onChange={(quantity) => {
                                        setQuantity(quantity)
                                    }}
                                    totalWidth={Dimensions.get('window').width - 250}
                                    totalHeight={40}
                                    iconSize={35}
                                    step={50}
                                    minValue={50}
                                    maxValue={50000}
                                    valueType='integer'
                                    textColor={COLOR.white}
                                    rounded={true}
                                    containerStyle={{borderWidth: 2}}
                                    borderColor={COLOR.white}
                                    iconStyle={{color: COLOR.white, alignSelf: "center"}}
                                    rightButtonBackgroundColor={COLOR.extra_color11}
                                    leftButtonBackgroundColor={COLOR.extra_color11}
                                />
                            </View>
                            {errorText ? <Text style={{
                                paddingVertical: 10,
                                marginVertical: 10,
                                marginHorizontal: "30%",
                                fontWeight: "bold",
                                fontSize: 15,
                                color: COLOR.white,
                                textAlign: 'center'
                            }}>{errorText}</Text> : <Text> </Text>}


                            <TouchableOpacity onPress={() => {
                                submitBuyRequest();
                            }}>
                                <Text style={{
                                    borderRadius: 5,
                                    paddingVertical: 3,
                                    marginHorizontal: "30%",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    color: COLOR.white,
                                    backgroundColor: COLOR.sky,
                                    textAlign: 'center'
                                }}>{trans('Buy')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("Projects");
                            }} style={{marginTop: 10}}>
                                <Text style={{
                                    borderRadius: 5,
                                    paddingVertical: 3,
                                    marginHorizontal: "30%",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    color: COLOR.white,
                                    backgroundColor: 'red',
                                    textAlign: 'center'
                                }}>{trans('Cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default BuyProject;
