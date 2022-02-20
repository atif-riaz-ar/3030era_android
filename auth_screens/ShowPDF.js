import React, {useContext, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Clipboard,
    ImageBackground,
    TouchableOpacity, Dimensions,
} from 'react-native';
import styles from "../styles/splash";
import * as COLOR from "../styles/constants";
import {AuthContext} from "../app_config/AuthProvider";
import { WebView } from 'react-native-webview';
import BottomMenu from "../stacks/BottomMenu";
import HeaderMenu from "../stacks/HeaderMenu";
import RenderHtml from "react-native-render-html";
import Loader from "../components/loader";

const Share = ({navigation, route}) => {

    const {user, appVars, trans} = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [copiedText, setCopiedText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    });

    return (
        <View style={{flex: 1, height: "100%"}}>
            {/*<Loader loading={false} />*/}
            <ImageBackground source={require('../images/main_bg.jpg')} style={styles.bg_image}/>
            <ScrollView style={{flex: 1}}
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
            >
                <HeaderMenu navigation={navigation} back={route.params.back} title={route.params.name+".pdf"}/>
                <View style={{padding: 10}}>
                            <Text style={{fontSize: 13, color: COLOR.white, marginBottom: 10}}>{route.params.path}</Text>
                            <RenderHtml
                                contentWidth={Dimensions.get('window').width - 60}
                                source={{html: "<html><body style='background: white; padding: 20px'>" + route.params.html + "</body></html>"}}
                                style={{width: "100%"}}
                            />

                </View>
            </ScrollView>
            <BottomMenu navigation={navigation}/>
        </View>
    );
}

export default Share;
