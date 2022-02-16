import { StyleSheet } from 'react-native';
import * as COLOR from '../styles/constants';

const styles = StyleSheet.create({
	SectionStyle: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
	},
	buttonStyleGoogle: {
		backgroundColor: '#cf4332',
		borderWidth: 0,
		width: '100%',
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 5,
		marginBottom: 5,
	},
	bg_image: {
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		position: 'absolute',
		opacity: 0.1,
	},
	buttonStyle: {
		backgroundColor: '#4a5b87',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 35,
		marginRight: 35,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	inputStyle: {
		flex: 1,
		color: '#000',
		height: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#000',
	},
	errorTextStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 14,
	},
	successTextStyle: {
		color: COLOR.extra_color0,
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold',
		textShadowColor: 'rgba(0, 0, 0, 0.3)',
		textShadowOffset: { width: -5, height: 5 },
		textShadowRadius: 10,
		padding: 30,
		margin: 20
	},
	preview_image: {
		width: 125,
		height: 125,
		marginTop: 20,
		borderWidth: 10,
		borderRadius: 8,
		alignSelf: 'center',
		borderColor: '#4a5b87'
	},
	container: {
		flex: 1,
		backgroundColor: 'aliceblue',
	},
	buttonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 8,
	},

	image: {
		marginVertical: 24,
		alignItems: 'center',
	},
});

export default styles;
