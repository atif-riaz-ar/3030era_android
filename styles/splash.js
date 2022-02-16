import {StyleSheet} from 'react-native';
import * as COLOR from "./constants";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLOR.sky,
		resizeMode: 'cover',
	},
	bg_image: {
		flex: 1,
		width:'100%',
		height: '100%',
		alignItems: 'center',
		position: 'absolute',
	},
	logo: {
		width: "30%",
	},
	open_cart_btn:{
		backgroundColor: "#1d4a74",
		width: 120,
		padding: 10,
		textAlign: 'center',
		color: 'white',
		fontSize: 16,
		// marginTop: -48,
		borderRadius: 5,
	},
	inputStyle: {
		flex: 1,
		color: '#fff',
		height: 45,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
	SectionStyle: {
		flexDirection: 'row',
		height: 35,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
		margin: 10,
		borderBottomWidth: 1,
		borderColor: "white"
	}
});

export default styles;
