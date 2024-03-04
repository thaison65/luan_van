import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import KeyIcon from '@mui/icons-material/Key';
import BallotIcon from '@mui/icons-material/Ballot';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export const ROUTE_LIST_IN_PROFILE = [
	{
		lable: 'Thông tin tài khoản',
		path: '/profile',
		Icon: AdminPanelSettingsIcon,
	},
	{
		lable: 'Mật khẩu',
		path: '/profile/password',
		Icon: KeyIcon,
	},
];

const Router = () => {};

export default Router;
