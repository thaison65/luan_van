import { useRouter } from 'next/router';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

type DialogAlertLoginProps = {
	open: boolean;
	handleClose: () => void;
};

const DialogAlertLogin = (props: DialogAlertLoginProps) => {
	const { open, handleClose } = props;

	const router = useRouter();

	const handleGotoLogin = () => {
		handleClose();
		router.push({
			pathname: '/login',
		});
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Thông báo khi chưa đăng nhập tài khoản'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Bạn cần phải đăng nhập mới có thể xem thông tin về khách sạn
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
					>
						Đóng
					</Button>
					<Button
						onClick={handleGotoLogin}
						autoFocus
						color="error"
					>
						Đi tới trang đăng nhập
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DialogAlertLogin;
