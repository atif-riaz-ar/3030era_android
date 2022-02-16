import React from 'react';
import {Text, StyleSheet, View, Modal, ActivityIndicator, Image} from 'react-native';
import * as COLOR from "../styles/constants";

const Loader = props => {
	const {loading, ...attributes} = props;
	return (
		<Modal transparent={true} animationType={'none'} visible={loading}>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<ActivityIndicator color={COLOR.primary_color} size="large" />
				</View>
			</View>
		</Modal>
	);
};

export default Loader;

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: COLOR.sky,
		opacity: 0.3,
	},
	activityIndicatorWrapper: {
		height: 100,
		width: 100,
		borderRadius: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});
