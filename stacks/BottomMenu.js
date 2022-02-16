import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import * as COLOR from '../styles/constants';
import Svg, {Path, Circle} from "react-native-svg";
import {AuthContext} from "../app_config/AuthProvider";

const Menu = (props) => {
    const {user, trans} = useContext(AuthContext);
    return (
        <View style={{paddingVertical: 10, flex: 0.13, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{position:"absolute", left: "0%", height: "100%", width: '100%'}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Home')}} style={{backgroundColor: "rgba(255, 255, 255, 1)", position:"absolute", bottom: -15, left: "0%", height: 75, paddingVertical: 10, width: '20%'}}>
                    <Svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512" className="s-ion-icon">
                        <Path d="M256.05 80.65Q263.94 80 272 80c106 0 192 86 192 192s-86 192-192 192A192.09 192.09 0 0189.12 330.65" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit={10} strokeWidth="32px"/>
                        <Path d="M256 48C141.12 48 48 141.12 48 256a207.29 207.29 0 0018.09 85L256 256z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px"/>
                    </Svg>
                    <Text style={{color: COLOR.black, textAlign:"center", height: "100%", fontSize: 15, fontWeight: "bold"}}>{trans('Overview')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Products')}} style={{backgroundColor: "rgba(255, 255, 255, 1)", position:"absolute", bottom: -15, left: "20%", height: 75, paddingVertical: 10, width: '20%'}}>
                    <Svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" className="s-ion-icon">
                        <Path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px"/>
                        <Path d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" stroke="#000" strokeMiterlimit={10} strokeWidth="32px"/>
                        <Path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px"/>
                        <Path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" stroke="#000" strokeLinecap="round" strokeMiterlimit={10} strokeWidth="32px"/>
                    </Svg>
                    <Text style={{color: COLOR.black, textAlign:"center",height: 20, fontSize: 15, fontWeight: "bold"}}>{trans('Products')}</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: "rgba(255, 255, 255, 1)", position:"absolute", bottom: -15, left: "40%", height: 75, paddingVertical: 10, width: '20%'}}>
                    <View style={{height: 62, width: 62, backgroundColor: COLOR.primary_color, padding: 15, borderRadius: 32, marginTop: -25}}>
                        <Image source={require("../images/mini-logo.png")} style={{alignSelf: "center"}}/>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Projects')}} style={{backgroundColor: "rgba(255, 255, 255, 1)", position:"absolute", bottom: -15, left: "60%", height: 75, paddingVertical: 10, width: '20%'}}>
                    <Svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" className="s-ion-icon">
                        <Circle cx={256} cy={184} r={120} stroke="#000" strokeLinejoin="round" strokeWidth="32px"/>
                        <Circle cx={344} cy={328} r={120} stroke="#000" strokeLinejoin="round" strokeWidth="32px"/>
                        <Circle cx={168} cy={328} r={120} stroke="#000" strokeLinejoin="round" strokeWidth="32px"/>
                    </Svg>
                    <Text style={{color: COLOR.black, textAlign:"center", height: "100%", fontSize: 15, fontWeight: "bold"}}>{trans('Projects')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Settings')}} style={{backgroundColor: "rgba(255, 255, 255, 1)", position:"absolute", bottom: -15, left: "80%", height: 75, paddingVertical: 10, width: '20%'}}>
                    <Svg style={{alignSelf: "center"}} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 512 512" className="s-ion-icon">
                        <Path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32px"/>
                    </Svg>
                    <Text style={{color: COLOR.black, textAlign:"center", height: "100%", fontSize: 15, fontWeight: "bold"}}>{trans('Settings')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Menu;
