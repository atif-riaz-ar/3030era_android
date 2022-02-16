import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#307ecc',
	},
	bg_image: {
		flex: 1,
		width:'100%',
		height: '100%',
		alignItems: 'center',
		position: 'absolute',
	},
	SectionStyle: {
		flexDirection: 'row',
		height: 35,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
		margin: 10,
	},
	buttonStyle: {
		backgroundColor: '#00bfff',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 0,
		marginLeft: 10,
		marginRight: 10,
	},
	buttonTextStylePlain: {
		marginTop: 10,
		marginBottom: 0,
		marginLeft: 10,
		marginRight: 10,
		color: '#ffffff',
		paddingVertical: 5,
		fontSize: 14,
	},
	buttonTextStyle: {
		paddingVertical: 8,
		color: '#ffffff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	inputStyle: {
		flex: 1,
		color: '#000',
		height: 40,
		fontSize: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#000',
	},
	registerTextStyle: {
		color: '#4a5b87',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
	},
	errorTextStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 14,
	},
	logo: {
		width: '80%',
		height: 200,
		resizeMode: 'contain',
		margin: 30,
	},
});

export default styles;
