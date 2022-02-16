import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    TouchableHighlight,
    View,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    ImageBackground, Linking,
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import NoData from "../components/NoData";
import Loader from "../components/loader";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFetchBlob from 'rn-fetch-blob';

const CspCert = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    let [loading, setLoading] = useState(true);

    const isPermitted = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs access to Storage data',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                alert('Write permission err', err);
                return false;
            }
        } else {
            return true;
        }
    };

    const createPDF = async (info) => {
        let perm = await isPermitted();
        setLoading(true);
        let html = '<style>' +
            '    #data_display td, #data_display th {' +
            '        color: white !important;' +
            '    }' +
            '    .pdf-content {' +
            '        width: 750px !important;' +
            '        padding: 10px !important;' +
            '        background: white !important;' +
            '    }' +
            '    .pdf-content td, .pdf-content th {' +
            '        border-top: 0 !important;' +
            '        color: black !important;' +
            '    }' +
            '</style><div class="pdf-content">' +
            '        <table width="100%" border="0">' +
            '            <tr>' +
            '                <td width="120"><img src="https://m.3030era.com.sg/assets/logo.png" alt="" width="100"></td>' +
            '                <td></td>' +
            '            </tr>' +
            '        </table>' +
            '        <table width="100%" border="0">' +
            '            <tr><strong>' +
            '                <center style="color: black !important;">CSP AGREEMENT</center>' +
            '            </strong></tr>' +
            '        </table>' +
            '        <table width="100%" border="0">' +
            '            <tr>' +
            '                <td>' +
            '                    Name: &emsp; <span id="pdf_name">' + info.f_name + " " + info.l_name + '</span><br>' +
            '                    Username: &emsp; <span id="pdf_un">'+info.username+'</span><br>' +
            '                    Certificate Number: &emsp; <span id="pdf_cert">'+info.certificate+'</span>' +
            '                </td>' +
            '            </tr>' +
            '        </table>' +
            '        <table width="100%" border="1">' +
            '            <tr>' +
            '                <td>Start Date: <span id="pdf_cdate">'+info.insert_time+'</span></td>' +
            '                <td>Completion Date: <span id="pdf_edate">'+info.end_date+'</span></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td>Fish Feed Purchased: <span id="pdf_feed">'+info.total_price+'</span></td>' +
            '                <td>Purchased Amount: <span id="pdf_amount">'+info.amount+'</span></td>' +
            '            </tr>' +
            '        </table>' +
            '        <table width="100%">' +
            '            <tr>' +
            '                <td colspan="2">Owner has read and understood the terms and conditions listed in CSP_AGREEMENT.pdf and entrusts 3030ERA Pte. Ltd. to proceed with 3030ERA Crop Share Program. This certificate is a proof of the Owner’s purchase of the items listed above from 3030ERA Pte Ltd.' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td width="40">' +
            '                    <center>1.</center>' +
            '                </td>' +
            '                <td>3030 ERA Pte Ltd is completely responsible for rearing fishes with member purchased fish feed and' +
            '                    the selling of the fishes through the company network of channels.' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td width="40">' +
            '                    <center>2.</center>' +
            '                </td>' +
            '                <td>3030 ERA Pte Ltd will be responsible for the fish upkeep for 180 or 300 days depending on the member' +
            '                    orders.' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td width="40">' +
            '                    <center>3.</center>' +
            '                </td>' +
            '                <td>3030 ERA Pte Ltd will credit the agreed profit to Cash Credit eWallet upon the completion of the' +
            '                    members Purchase Order.' +
            '                </td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td width="40">' +
            '                </td>' +
            '                <td>This Entrustment Certificate will not be duplicated or replaced in any scenario.</td>' +
            '            </tr>' +
            '        </table>' +
            '        <table width="100%" border="0">' +
            '            <tr>' +
            '                <td width="140">' +
            '                    <img src="https://m.3030era.com.sg/assets/sign.png" alt="" width="120">' +
            '                    <br>' +
            '                    Raymond Ng <br>' +
            '                    Director <br>' +
            '                    3030 ERA PTE. LTD.' +
            '                </td>' +
            '                <td width="140"><img src="https://m.3030era.com.sg/assets/stamp.png" alt="" width="120"></td>' +
            '                <td></td>' +
            '            </tr>' +
            '        </table>' +
            '        <table width="100%" border="0">' +
            '            <tr>' +
            '                <td style="color: slategray"><center>3030 ERA PTE LTD <br>' +
            '                    Address: 6 Pasir Ris Farmway 1 Singapore 519391  Tel: +65 3159 2371' +
            '                </center></td>' +
            '            </tr>' +
            '        </table>' +
            '    </div>';

        let options = {
            html: html,
            fileName: info.certificate,
            directory: 'Documents',
            base64: true,
        }
        let file = await RNHTMLtoPDF.convert(options);

        const path = RNFetchBlob.fs.dirs.DownloadDir + "/"+ info.certificate +".pdf";

        try {
            RNFetchBlob.fs.writeFile(path, file.base64, 'base64').then(() => {
                setLoading(false);
                alert(trans('CheckDownload'));
            });
        } catch (error) {
            setLoading(false);
            alert(trans('DownloadFailed'));
        }
    }

    useEffect(() => {
        setLoading(true)
        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        fetch(api_url + "member_profile_api/get_orders", {
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
                <HeaderMenu navigation={navigation} back="Home" title="CSPCertificate"/>
                <View style={{paddingBottom: 30}}>
                    {/*CspCert Loop*/}
                    {list.length == 0 ? <NoData/> : list.map((item, index) => (
                        <TouchableHighlight
                            key={item.id}
                        >
                            <View style={{flex: 1, flexDirection: 'row', flexWrap: "wrap", marginTop: 10, marginHorizontal: 15, backgroundColor: COLOR.primary_color, borderRadius: 5, padding: 10}}>
                                <View style={{alignSelf: "flex-start", width: "100%", marginBottom: 10}}>
                                    <Text style={{fontSize: 15, color: COLOR.white, fontWeight: "bold", marginBottom: 6, textAlign: 'center'}}>{trans('CSPCertificate')}: {item.certificate}</Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginBottom: 6, textAlign: 'center'}}>{trans('PurchasedAmount')}: ${item.total_price}</Text>
                                    <Text style={{fontSize: 15, color: COLOR.white, marginBottom: 12, textAlign: 'center'}}>{trans('CompletionDate')}: {item.end_date}</Text>
                                    <TouchableOpacity onPress={() => { createPDF(item) }} style={{marginTop: 20, width: "60%", alignSelf: "center"}}>
                                        <Text style={{borderRadius: 5, paddingVertical: 10, marginHorizontal: 30, fontWeight: "bold", fontSize: 15, color: COLOR.white, backgroundColor: COLOR.sky, textAlign: 'center'}}>{trans('Download')}</Text>
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

export default CspCert;
