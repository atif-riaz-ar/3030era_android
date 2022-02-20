import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableHighlight, View, ImageBackground, TouchableOpacity, PermissionsAndroid, Image} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Loader from "../components/loader";

const OpenCart = ({navigation, route}) => {
    let item = route.params.item;
    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [response, setResponse] = useState(null);
    let [imageSourceData, setImageSourceData] = useState(null);
    let [loading, setLoading] = useState(false);

    const openCamera = async () => {
        setResponse(null)
        setImageSourceData(null);
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const options = {
                    mediaType: 'photo',
                    quality: 0.1,
                };
                launchCamera(options, response => {
                    if (response.didCancel) {
                    } else if (response.error) {
                        alert(trans("CameraError"))
                    }
                    else {
                        let source = { uri: response.assets[0].uri };
                        setResponse(response)
                        setImageSourceData(source);
                    }
                });
            } else {
                alert("Camera Permission Denied")
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const openGallery = () => {
        setResponse(null)
        setImageSourceData(null);
        const options = {
            mediaType: 'photo',
            quality: 0.1
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
                alert(trans('GalleryError'))
            }
            else {
                let source = { uri: response.assets[0].uri };
                setResponse(response)
                setImageSourceData(source);
            }
        });
    };

    const uploadPaymentSlip = () => {
        let iamgeSourcex = response.assets[0].uri;
        let uriPart = iamgeSourcex.split('.');
        let fileExtension = uriPart[uriPart.length - 1];
        setLoading(true);

        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        p_data.append("request_id", item.id);

        p_data.append('attachment', {
            uri: iamgeSourcex,
            name: `image.${fileExtension}`,
            type: `image/${fileExtension}`
        });

        // fetch(api_url + "https://m.3030era.com.sg/member_purchase_api/uploadPurchaseReceipt", {
        fetch("https://m.3030era.com.sg/member_purchase_api/uploadPurchaseReceipt", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            setLoading(false);
            alert('Uploaded successfully.');
            navigation.navigate("Open Cart");
        }).catch(error => {
            console.log("error: ",error);
            setLoading(false);
            alert(trans("SubmitFailed"));
        })
    }

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading} />
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back="Open Cart" title="MakePayment"/>
                <View style={{margin: 20}}>
                    <TouchableHighlight>
                        <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                            <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                <Text style={{fontSize: 18, color: COLOR.white, marginTop: 2, marginBottom: 10, textAlign: 'center', textDecorationLine: 'underline'}}>{trans('MakePayment')}</Text>
                                <Text style={{fontSize: 15, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>{item.product_name}</Text>
                                <Text style={{fontSize: 15, color: COLOR.white, marginVertical: 2, textAlign: 'left'}}>
                                    {'\n'}{trans('OwnerBank')}
                                    {'\n'}{trans('OwnerCompany')}
                                    {'\n'}{trans('OwnerAccount')}: 601-525215-001
                                    {'\n'}{trans('OwnerBank')}
                                    {'\n'}{trans('OwnerPaynow')}: 202120184H
                                    {'\n'}
                                    {'\n'}{trans('Amount')}: {item.total_price}
                                    {'\n'}{trans('PaymentSlip')}
                                </Text>

                                <View style={{flex: 1, flexDirection: "column", marginHorizontal: 30}}>
                                    <View style={{alignSelf: "center", width: "80%", marginTop: 20}}>
                                        <Image style={{alignSelf:'center', width: 150, height: 150, borderWidth: 2, borderColor: COLOR.white, borderRadius: 5 }} source={imageSourceData != null ? imageSourceData : require('../images/na.png')} />
                                    </View>
                                    <View style={{alignSelf: "center", width: "100%"}}>
                                        <TouchableOpacity style={{alignSelf: "center", marginTop: 0, width: "80%"}} onPress={openCamera.bind(this)}>
                                            <Text style={{marginVertical: 5, borderRadius: 5, paddingVertical: 10, marginHorizontal: 5, fontSize: 13, color: COLOR.white, backgroundColor: COLOR.header, textAlign: 'center'}}>{trans('TakePhoto')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{alignSelf: "center", marginTop: 0, width: "80%"}} onPress={openGallery.bind(this)}>
                                            <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 5, fontSize: 13, color: COLOR.white, backgroundColor: COLOR.header, textAlign: 'center'}}>{trans('FromGallery')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{alignSelf: "center", marginTop: 20, width: "80%"}} onPress={() => { return uploadPaymentSlip() }}>
                                            <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 5, fontSize: 13, color: COLOR.white, backgroundColor: COLOR.extra_danger, textAlign: 'center'}}>{trans('UploadSlip')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default OpenCart;
