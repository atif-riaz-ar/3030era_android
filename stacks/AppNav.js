import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, ScrollView} from 'react-native';
import {AuthContext} from '../app_config/AuthProvider';
import Logout from '../components/Logout';
import * as COLOR from '../styles/constants';
import Home from "../auth_screens/Home";
import LogoutMenu from "./LogoutMenu";
import PointMenu from "./PointMenu";
import UserMenu from "./UserMenu";
import Ec3030Menu from "./Ec3030Menu";
import OpenCart from "../auth_screens/OpenCart";
import Announcement from "../auth_screens/Announcement";
import Reports from "../auth_screens/Reports";
import Withdrawals from "../auth_screens/Withdrawals";
import CspList from "../auth_screens/CspList";
import CspCert from "../auth_screens/CspCert";
import Share from "../auth_screens/Share";
import WithdrawalReports from "../auth_screens/WithdrawalReports";
import WalletReports from "../auth_screens/WalletReports";
import BonusReports from "../auth_screens/BonusReports";
import Products from "../auth_screens/Products";
import Projects from "../auth_screens/Projects";
import Settings from "../auth_screens/Settings";
import BuyProject from "../auth_screens/BuyProject";
import MyTeam from "../auth_screens/MyTeam";
import Genealogy from "../auth_screens/Genealogy";
import ChangePassword from "../auth_screens/ChangePassword";
import SecurityPassword from "../auth_screens/SecurityPassword";
import ChangeLanguage from "../auth_screens/ChangeLanguage";
import TeamDetail from "../auth_screens/TeamDetail";
import MakePayment from "../auth_screens/MakePayment";
import BuyCancel from "../auth_screens/BuyCancel";
import DownloadOrder from "../auth_screens/DownloadOrder";

const Nav = createDrawerNavigator();

const CustomDrawerBefore = props => {
	return (
		<View>
			<ScrollView style={{marginBottom: 225,backgroundColor: COLOR.primary_color, height: "100%"}}>
				<UserMenu title="" icon="logout" nav={props.navigation}/>
				<PointMenu title="" icon="logout" nav={props.navigation}/>
				<Ec3030Menu title="" icon="logout" nav={props.navigation}/>
				<LogoutMenu title="" icon="logout" nav={props.navigation}/>
			</ScrollView>
		</View>
	);
};

const AppNav = ({}) => {

	const {logout} = useContext(AuthContext);

	return (
		<Nav.Navigator
			initialRouteName="Home"
			drawerContentOptions={{
				activeTintColor: COLOR.white,
				activeBackgroundColor: COLOR.primary_color,
			}}
			drawerContent={props => CustomDrawerBefore(props)}
		>
			<Nav.Screen name="Home" component={Home}/>
			<Nav.Screen name="Logout" component={Logout}/>
			<Nav.Screen name="Announcement" component={Announcement}/>
			<Nav.Screen name="Reports" component={Reports}/>
			<Nav.Screen name="Withdrawal" component={Withdrawals}/>
			<Nav.Screen name="CSP List" component={CspList}/>
			<Nav.Screen name="CSP Cert" component={CspCert}/>
			<Nav.Screen name="Withdrawal Reports" component={WithdrawalReports}/>
			<Nav.Screen name="Wallet Reports" component={WalletReports}/>
			<Nav.Screen name="Bonus Reports" component={BonusReports}/>
			<Nav.Screen name="Open Cart" component={OpenCart}/>
			<Nav.Screen name="Share" component={Share}/>
			<Nav.Screen name="Products" component={Products}/>
			<Nav.Screen name="Projects" component={Projects}/>
			<Nav.Screen name="Settings" component={Settings}/>
			<Nav.Screen name="BuyProject" component={BuyProject}/>
			<Nav.Screen name="MakePayment" component={MakePayment}/>
			<Nav.Screen name="DownloadOrder" component={DownloadOrder}/>
			<Nav.Screen name="BuyCancel" component={BuyCancel}/>
			<Nav.Screen name="My Team" component={MyTeam}/>
			<Nav.Screen name="Genealogy Tree" component={Genealogy}/>
			<Nav.Screen name="Change Password" component={ChangePassword}/>
			<Nav.Screen name="Security Password" component={SecurityPassword}/>
			<Nav.Screen name="Change Language" component={ChangeLanguage}/>
			<Nav.Screen name="Team Detail" component={TeamDetail}/>
		</Nav.Navigator>
	);
};

export default AppNav;