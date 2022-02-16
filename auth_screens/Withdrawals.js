import React, {useContext, useState} from 'react';
import {ScrollView, Text, View, ImageBackground, TouchableOpacity, TextInput, Picker} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import {api_url, app_id} from "../globals/vars";
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import Loader from "../components/loader";


const Reports = ({navigation, route}) => {
    const {user, appVars, trans} = useContext(AuthContext)
    let [bank, setBank] = useState("");
    let [wallet, setWallet] = useState("");
    let [walletAddress, setWalletAddress] = useState("");
    let [account, setAccount] = useState("");
    let [amount, setAmount] = useState(0);
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState("");
    let [errorText, setErrorText] = useState("");

    const withdraw = () => {
        setErrorText("");
        if(user.country == 65) {
            if (bank === "") {
                setErrorText(trans("BankError"));
                return false
            }
            if (account.length < 5) {
                setErrorText(trans("AccountError"));
                return false
            }
        } else {
            if (wallet === "") {
                setErrorText(trans("WalletError"));
                return false
            }
            if (walletAddress.length < 5) {
                setErrorText(trans("AddressError"));
                return false
            }
        }
        if (parseFloat(amount) == 0) {
            setErrorText(trans("AmountError"));
            return false
        }
        if (password.length < 4) {
            setErrorText(trans("SecPassError"));
            return false
        }

        setLoading(true)

        let p_data = new FormData();
        p_data.append("access_token", user.access_token);
        p_data.append("app_id", app_id);
        p_data.append("security_key", appVars.sky);
        p_data.append("amount", amount);
        p_data.append("provider_name", bank);
        p_data.append("bank_account", account);
        p_data.append("scr_password", password);
        p_data.append("wallet_addr", walletAddress);
        p_data.append("crypto_method", wallet);

        fetch(api_url + "member_transaction_api/withdrawalIDMwallet", {
            method: "POST",
            body: p_data,
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
        }).then((responseData) => {
            return responseData.json();
        }).then(responseJson => {
            if(responseJson.response_data.trans_id) {
                setBank("");
                setPassword("");
                setAccount("");
                setAmount("");
                setWallet("");
                setWalletAddress("");
                setErrorText(trans("Submitted"));
                setLoading(false);
                return responseData.json();
            } else {
                setErrorText(trans("SubmitFailed"));
                setLoading(false);
            }
        }).catch(error => {
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
                <HeaderMenu navigation={navigation} back="Home" title="Withdrawal"/>
                <View style={{paddingBottom: 30}}>
                    {/*Reports Loop*/}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: "wrap",
                        marginTop: 10,
                        marginHorizontal: 15,
                        backgroundColor: COLOR.primary_color,
                        borderRadius: 5,
                        padding: 15,
                    }}>
                        <View style={{width: "100%"}}>

                            {user.country == 65 ? (
                                <>
                                    <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                        <Picker
                                            style={{
                                                width: "100%",
                                                color: "white",
                                                height: 45,
                                                backgroundColor: COLOR.sky
                                            }}
                                            itemStyle={{height: 45}}
                                            selectedValue={bank}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setBank(itemValue)
                                            }}
                                        >
                                            <Picker.Item color={COLOR.header}value="" label={trans('SelectBank')} />
                                            <Picker.Item color={COLOR.header}value="DBS" label="DBS"/>
                                            <Picker.Item color={COLOR.header}value="UOB" label="UOB"/>
                                            <Picker.Item color={COLOR.header}value="OCBC" label="OCBC"/>
                                            <Picker.Item color={COLOR.header}value="POSB" label="POSB"/>
                                            <Picker.Item color={COLOR.header}value="Standard Charter" label="Standard Charter"/>
                                            <Picker.Item color={COLOR.header}value="Citibank" label="Citibank"/>
                                            <Picker.Item color={COLOR.header}value="HSBC" label="HSBC"/>
                                            <Picker.Item color={COLOR.header}value="MAYBANK" label="MAYBANK"/>
                                            <Picker.Item color={COLOR.header}value="Bank of China" label="Bank of China"/>
                                        </Picker>
                                    </View>

                                    <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={account => setAccount(account)}
                                            value={account}
                                            placeholder={trans('AccountNum')}
                                            placeholderTextColor="#999"
                                            autoCapitalize="none"
                                            keyboardType="number-pad"
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                        <Picker
                                            style={{
                                                width: "100%",
                                                color: "white",
                                                height: 45,
                                                backgroundColor: COLOR.sky
                                            }}
                                            itemStyle={{height: 45}}
                                            selectedValue={wallet}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setWallet(itemValue)
                                            }}>
                                            <Picker.Item color={COLOR.header}value="" label={trans("SelectWallet")} />
                                            <Picker.Item color={COLOR.header}value="erc20" label="ERC20"/>
                                            <Picker.Item color={COLOR.header}value="trc20" label="TRC20"/>
                                        </Picker>
                                    </View>

                                    <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            onChangeText={walletAddress => setWalletAddress(walletAddress)}
                                            value={walletAddress}
                                            placeholder={trans("WalletAddress")}
                                            placeholderTextColor="#999"
                                            autoCapitalize="none"
                                            keyboardType="number-pad"
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                </>
                            )
                            }
                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={amount => setAmount(amount)}
                                    value={amount}
                                    placeholder={trans("WithdrawalAmount")}
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"
                                    keyboardType="number-pad"
                                    blurOnSubmit={false}
                                />
                            </View>

                            <View style={[styles.SectionStyle, {marginBottom: 10}]}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={password => setPassword(password)}
                                    value={password}
                                    placeholder={trans('SecurityPassword')}
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    blurOnSubmit={false}
                                    secureTextEntry={true}
                                />
                            </View>

                        </View>
                    </View>

                    {errorText ? <Text style={{
                        paddingVertical: 10,
                        marginTop: 20,
                        marginHorizontal: 60,
                        fontWeight: "bold",
                        fontSize: 15,
                        color: COLOR.white,
                        borderRadius: 5,
                        textAlign: 'center'
                    }}>{errorText}</Text> : <Text> </Text>}
                    <TouchableOpacity onPress={() => {
                        withdraw()
                    }} style={{width: "100%", marginTop: 30}}>
                        <Text style={{
                            borderRadius: 5,
                            paddingVertical: 10,
                            marginHorizontal: 60,
                            fontWeight: "bold",
                            fontSize: 18,
                            color: COLOR.white,
                            backgroundColor: COLOR.sky,
                            textAlign: 'center'
                        }}>{trans('Withdraw')}</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Reports;
