import React, { Component } from 'react';

import {Text, TouchableHighlight, View} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class Download extends Component {
    async createPDF(props) {
        let options = {
            html: props.html,
            fileName: 'test',
            directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options)
        alert(file.filePath);
    }

    render() {
        return(
            <View>
                <TouchableHighlight onPress={this.createPDF}>
                    <Text>Create PDF</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
