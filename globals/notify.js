import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-community/async-storage";
import {api_url, app_id} from "../globals/vars";
import * as COLOR from "../styles/constants";

const Notify = ({}) => {

    const [display, setDisplay] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFcmToken();
        }
    }
    const getFcmToken = async () => {
        let fcmToken = await AsyncStorage.getItem("fcmToken");
        if (!fcmToken) {
            try {
                const fcmToken = await messaging().getToken();
                if (fcmToken) {
                    AsyncStorage.setItem('fcmToken', fcmToken);
                    let data = new FormData();
                    data.append("build_number", '1.0');
                    data.append("app_id", app_id);
                    data.append("os", 'android');
                    data.append("device_id", fcmToken);
                    fetch(api_url + "basic_api/add_device", {
                        method: "POST",
                        body: data,
                        headers: new Headers({
                            'Content-Type': 'multipart/form-data'
                        })
                    }).then((responseData) => {
                    }).then(responseJson => {
                        notificationListener();
                    }).catch(error => {
                    });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            notificationListener();
        }
    }
    const notificationListener = async () => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                // console.log('Notification onNotificationOpenedApp:', remoteMessage.notification);
            }
        });

        messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage) {
                let noti = remoteMessage.notification;
                setDisplay(true)
                setTitle(noti.title)
                setMessage(noti.body)
            }
        });

        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                // console.log('Notification getInitialNotification:', remoteMessage.notification);
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            // console.log('Notification setBackgroundMessageHandler: ', remoteMessage);
        });
    }

    useEffect(() => {
        requestUserPermission();
    }, []);

    const clearNotification = () => {
        setDisplay(false)
        setTitle("")
        setMessage("")
    }

    if(display){
        return (
            <TouchableOpacity onPress={() => {clearNotification()}} style={{borderRadius: 5, paddingHorizontal: 5, position: 'absolute',backgroundColor: COLOR.notification, bottom: 90, right :10}}>
                <Text style={{margin: 1, paddingTop: 3, color: COLOR.white, fontSize: 14, fontWeight: 'bold', textAlign: "left"}}>{title}</Text>
                <Text style={{margin: 1, paddingBottom: 3, color: COLOR.white, fontSize: 12, textAlign: "left"}}>{message}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <></>
    );

}

export default Notify;
