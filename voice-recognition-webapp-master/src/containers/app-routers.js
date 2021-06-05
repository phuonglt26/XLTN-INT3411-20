import Home from 'containers/home/home';
import Register from './register/register';
import Verification from './verification/verification';
import ManageAccount from './manage-account/manage-account';

export const APP_ROUTES = [
	{
		path: '/',
		exact: true,
		component: Home,
		htmlTitle: "Voice Verification System"
	},
    {
		path: '/register',
		exact: false,
		component: Register,
		htmlTitle: "Register"
	},
    {
		path: '/verification',
		exact: false,
		component: Verification,
		htmlTitle: "Verification",
	},
    
    {
		path: '/manage-account',
		exact: false,
		component: ManageAccount,
		htmlTitle: "Manage Account",
	}
];

export const DEFAULT_APP_ROUTE = APP_ROUTES[0];
