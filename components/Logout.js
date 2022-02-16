import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../app_config/AuthProvider';

const Logout = ({navigation, route}) => {
	const {logout} = useContext(AuthContext);
	useEffect(() => {
		logout();
	}, []);
	return (<></>);
};

export default Logout;
