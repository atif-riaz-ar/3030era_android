import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    ImageBackground, TouchableOpacity, Platform, PermissionsAndroid,
} from 'react-native';
import styles from "../styles/splash";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import * as COLOR from '../styles/constants';
import Loader from "../components/loader";
import NoData from "../components/NoData";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFetchBlob from "rn-fetch-blob";

const OpenCart = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [render, setRender] = useState(0);
    let [loading, setLoading] = useState(true);

    const createPDF = async (info) => {
        setLoading(true);
        let html = '<table width="675" border="0" cellspacing="1" cellpadding="3">' +
            '            <tr>' +
            '                <td colspan="8"><img src="https://m.3030era.com.sg/assets/logo.png" alt="" width="100"><br><br><br></td>' +
            '                <td colspan="8">' +
            '                    TAX INVOICE/OFFICIAL RECEIPT <br>' +
            '                    Co. Registration No.: 202120184H <br>' +
            '                    Invoice / Receipt No.: <span id="pdf_inv_num">' + info.invoice_id + '</span> <br>' +
            '                    Invoice / Receipt Date:<span id="pdf_inv_date">' + info.insert_time + '</span> <br>' +
            '                <br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="16">' +
            '                    <strong>Invoice To</strong> <br>' +
            '                    <span id="pdf_invoice_to">' + info.user + '</span>' +
            '                <br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="2">' +
            '                    <strong>S/N</strong>' +
            '                </td>' +
            '                <td colspan="2">' +
            '                    <strong>Code</strong>' +
            '                </td>' +
            '                <td colspan="6">' +
            '                    <strong>Description</strong>' +
            '                </td>' +
            '                <td colspan="2">' +
            '                    <strong>Quantity</strong>' +
            '                </td>' +
            '                <td colspan="2">' +
            '                    <strong>Unit Price</strong>' +
            '                </td>' +
            '                <td colspan="2">' +
            '                    <strong>Total</strong>' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="2"><span id="pdf_sr">' + info.sponsor + '</span><br><br><br></td>' +
            '                <td colspan="2"><span id="pdf_code">' + info.item_code + '</span><br><br><br></td>' +
            '                <td colspan="6"><span id="pdf_desc">' + info.description + '</span><br><br><br></td>' +
            '                <td colspan="2"><span id="pdf_qty">' + info.amount + '</span><br><br><br></td>' +
            '                <td colspan="2"><span id="pdf_unit">' + info.unit_price + '</span><br><br><br></td>' +
            '                <td colspan="2"><span id="pdf_total">' + info.total_price + '</span><br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="7">' +
            '                    <strong>Total Quanity: </strong><br>' +
            '                    <span id="pdf_qty1">' + info.amount + '</span>' +
            '                <br><br><br></td>' +
            '                <td colspan="9">' +
            '                    <strong>Grand Total: </strong><br>' +
            '                    <span id="pdf_gtotal">' + info.total_price + '</span>' +
            '                <br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="16">' +
            '                    <strong>Payment Details</strong>' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="7">' +
            '                    <strong>Amount Paid $</strong>' +
            '                    <span id="pdf_paid">' + info.total_price + '</span>' +
            '                <br><br><br></td>' +
            '                <td colspan="9">' +
            '                    <strong>Balance Payment $</strong>' +
            '                    <span id="pdf_balance">0</span>' +
            '                <br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="5">' +
            '                    <strong>Payment Mode</strong>' +
            '                    <span id="pdf_mode">' + info.type + '</span>' +
            '                <br><br><br></td>' +
            '                <td colspan="11"><br><br><br></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td colspan="16">' +
            '                    Thank you for your order. Sales are governed by the Company Policies and Procedures.' +
            '                <br>' +
            '                    Computer generated receipt, no signature required.' +
            '                <br><br><br></td>' +
            '            </tr>' +
            '        </table>';

        let options = {
            html: html,
            fileName: info.invoice_id,
            directory: 'Documents',
        }
        let file = await RNHTMLtoPDF.convert(options);
        setLoading(false)
        navigation.navigate("ShowPDF", {
            html: html,
            back: "Open Cart",
            name: info.invoice_id,
            path: file.filePath
        });
    }

    const load_data = () => {
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_purchase_api/getAllCart", {
            method: "POST",
            body: p_data,
            headers: new Headers({'Content-Type': 'multipart/form-data'})
        }).then((responseData) => {
            return responseData.json();
        }).then((responseJson) => {
            setList(responseJson);
            setLoading(false);
            setTimeout(() => {
                load_data();
            }, 10000);
        }).catch(error => {
            setLoading(false);
        });
    }

    useEffect(() => {
        load_data()
    }, []);

    return (
        <View style={{flex: 1, height: "100%"}}>
            <Loader loading={loading}/>
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}>
                <HeaderMenu navigation={navigation} back="Home" title="Open Cart"/>
                <View style={{margin: 20}}>
                    {/*OpenCart Loop*/}
                    {list.length == 0 ?
                        <NoData/> : list.map((item, index) => (item.status === 'WAITING' || item.status === 'PENDING' || item.status === 'COMPELETED') ?
                            <TouchableHighlight key={index}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    flexWrap: "wrap",
                                    marginTop: 10,
                                    marginHorizontal: 15,
                                    backgroundColor: COLOR.primary_color,
                                    borderRadius: 5,
                                    padding: 10
                                }}>
                                    <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLOR.white,
                                            marginVertical: 2,
                                            textAlign: 'left'
                                        }}>{trans('Status')}: {trans(item.status)}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLOR.white,
                                            marginVertical: 2,
                                            textAlign: 'left'
                                        }}>{item.product_name}</Text>
                                        {item.status === 'COMPELETED' ? <Text style={{
                                            fontSize: 16,
                                            color: COLOR.white,
                                            marginVertical: 2,
                                            textAlign: 'left'
                                        }}>{trans('DueDate')}: {item.end_date}</Text> : <></>}
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLOR.white,
                                            marginVertical: 2,
                                            textAlign: 'left'
                                        }}>{trans('Amount')}: {item.total_price}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: COLOR.white,
                                            marginVertical: 2,
                                            textAlign: 'left'
                                        }}>{trans('Quantity')}: {item.amount}</Text>

                                        {item.status === 'COMPELETED' ?
                                            <TouchableOpacity onPress={() => {
                                                createPDF(item);
                                            }} style={{marginTop: 20, width: "60%", alignSelf: "center"}}>
                                                <Text style={{
                                                    borderRadius: 5,
                                                    paddingVertical: 5,
                                                    marginHorizontal: 30,
                                                    fontWeight: "bold",
                                                    fontSize: 13,
                                                    color: COLOR.white,
                                                    backgroundColor: COLOR.sky,
                                                    textAlign: 'center'
                                                }}>{trans('Invoice')}</Text>
                                            </TouchableOpacity>
                                            :
                                            item.status === 'WAITING' ? <></>
                                                :
                                                user.country == 65 ?
                                                    <View style={{flex: 1, flexDirection: "row", marginHorizontal: 30}}>
                                                        <TouchableOpacity onPress={() => {
                                                            navigation.navigate("MakePayment", {item: item});
                                                        }} style={{
                                                            alignSelf: "flex-start",
                                                            marginTop: 20,
                                                            width: "50%"
                                                        }}>
                                                            <Text style={{
                                                                borderRadius: 5,
                                                                paddingVertical: 5,
                                                                marginHorizontal: 5,
                                                                fontSize: 13,
                                                                color: COLOR.white,
                                                                backgroundColor: COLOR.sky,
                                                                textAlign: 'center'
                                                            }}>{trans('MakePayment')}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            setList([]);
                                                            navigation.navigate("BuyCancel", {item: item});
                                                        }} style={{alignSelf: "flex-end", marginTop: 20, width: "50%"}}>
                                                            <Text style={{
                                                                borderRadius: 5,
                                                                paddingVertical: 5,
                                                                marginHorizontal: 5,
                                                                fontSize: 13,
                                                                color: COLOR.white,
                                                                backgroundColor: COLOR.extra_danger,
                                                                textAlign: 'center'
                                                            }}>{trans('Cancel')}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <></>
                                        }
                                    </View>
                                </View>
                            </TouchableHighlight> : <View key={index}></View>
                        )}
                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}


export default OpenCart;
