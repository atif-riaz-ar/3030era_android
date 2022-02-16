import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as COLOR from '../styles/constants';
import Svg, {Path} from "react-native-svg";
import {AuthContext} from "../app_config/AuthProvider";

const Menu = (props) => {
    const {user, trans} = useContext(AuthContext);
    return (
        <TouchableOpacity onPress={() => props.nav.navigate("Logout")} style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLOR.primary_color,
            paddingLeft: 12
        }}>

            <Svg width="18" height="18" viewBox="0 0 520.349 520.349" style={{
                marginTop: 6,
                marginRight: 5
            }}>
                <Path fill={COLOR.white} d="M445.223 0H142.589c-6.683 0-12.105 5.423-12.105 12.105v180.979h16.65c-5.006-6.392-7.725-14.224-7.725-22.467-.006-9.764 3.8-18.943 10.708-25.845 1.421-1.421 2.973-2.687 4.583-3.845V24.211h278.417v8.697l-127.104 92.285v395.155l127.796-92.787c1.626 4.77 6.095 8.228 11.414 8.228 6.685 0 12.105-5.426 12.105-12.105V12.105C457.328 5.417 451.907 0 445.223 0zm-91.192 331.973c-5.71 0-10.468-7.046-11.691-16.485h-13.63v-10.592h13.819c1.448-8.86 6.017-15.38 11.49-15.38 6.638 0 12.011 9.498 12.011 21.231.012 11.721-5.367 21.226-11.999 21.226zm-203.909-17.502a37.047 37.047 0 004.572 3.824v105.389c0 6.68-5.426 12.105-12.105 12.105-6.683 0-12.105-5.426-12.105-12.105V266.139h16.65c-11.186 14.327-10.199 35.132 2.988 48.332zm86.584-96.086a12.312 12.312 0 010 17.425l-58.995 59.001a12.348 12.348 0 01-8.709 3.611 12.304 12.304 0 01-8.71-3.611c-4.811-4.817-4.805-12.613 0-17.419l37.974-37.977H75.336c-6.803 0-12.315-5.512-12.315-12.315s5.506-12.318 12.321-12.318h122.917l-37.968-37.974c-4.805-4.805-4.811-12.608 0-17.413 4.812-4.812 12.614-4.812 17.425 0l58.99 58.99z" />
            </Svg>

            <Text style={{
                flex: 1,
                fontSize: 13,
                paddingTop: 4,
                color: COLOR.white
            }}>{trans('Logout')}</Text>
        </TouchableOpacity>
    );
};

export default Menu;