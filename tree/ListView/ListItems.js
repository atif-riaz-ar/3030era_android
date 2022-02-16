import React from "react";
import {View, Image, Text, TouchableOpacity, StyleSheet} from "react-native";

export default ListItem = props => {
    const {
        listItemStyle,
        onPress,
        leftImageStyle,
        leftImage,
        text,
        textStyle,
        rightImage,
        rightImageStyle,
        rightImageWrapperStyle
    } = props;
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={onPress}>
            {leftImage !== false ?
                <Image style={{width: 12, height: 12}} source={require('../../images/right.png')} />
                :
                <View style={styles.llll}><></></View>
            }
            <Text style={[styles.text, {padding: 5, paddingLeft: (leftImage !== false? 0: 12) , color: 'white'}]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, flexDirection: "row", paddingVertical: 0, alignItems: "center"},
    llll: {padding: 0, marginLeft: 0, width: 0, height: 14, borderStyle:'dotted', borderWidth: 1, borderColor: "white", margin: 0},
    text: {fontSize: 12, color: "#fff", marginLeft: 5, marginRight: 10},
});
