import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

import {
	Box,
	Stack,
	Paper,
	Typography,
	TextField,
	Button,
	Alert,
	Dialog,
	DialogTitle,
} from '@mui/material';
import { InvalidPasswordException } from '~/utils';
import { useAuth } from '~/hooks';

interface PasswordDesktopProps {}

function PasswordDesktop({}: PasswordDesktopProps) {
	const { profile, updatePwd, logout } = useAuth();
	const router = useRouter();

	const [pwdOld, setPwdOld] = useState<string>('');
	const [newPwd, setNewPwd] = useState<string>('');
	const [pwd, setPwd] = useState<string>('');

	const [pwdError, setPwdError] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	const handleChangePwdOld = (event: ChangeEvent<HTMLInputElement>) => {
		setPwdOld(event.target.value as string);
	};

	const handleChangeNewPwd = (event: ChangeEvent<HTMLInputElement>) => {
		setNewPwd(event.target.value as string);
	};
	const handleChangePwd = (event: ChangeEvent<HTMLInputElement>) => {
		setPwd(event.target.value as string);
	};

	const hanldeCheckPwd = () => {
		if (newPwd !== pwd) {
			setPwdError(true);
			return;
		}
		setPwdError(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmitFormUpdate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const _id = profile?.data?._id;

		try {
			if (!!pwdOld && !!newPwd) {
				if (newPwd !== pwd) {
					throw new Error('Mật khẩu và xác nhận không trùng khớp!');
				}
				await updatePwd({ _id, pwdOld, newPwd });
				await logout();
				router.push('/');
			}
			setOpen(true);
		} catch (error: unknown) {
			if (error instanceof InvalidPasswordException) {
				console.log(error.message);
				return;
			}
			setOpen(true);
		}
	};
	return (
		<Box
			display={{ xs: 'none', lg: 'flex' }}
			component={'form'}
			encType=""
			onSubmit={handleSubmitFormUpdate}
		>
			<Box
				component={Paper}
				elevation={0}
				bgcolor={'#F8F7F9'}
				minWidth={700}
			>
				<Typography
					variant="h5"
					component={'h2'}
					fontWeight={500}
				>
					Thay đổi mật khẩu
				</Typography>

				<Box
					component={Paper}
					mt={1}
					p={2}
				>
					<Box mt={3}>
						<TextField
							fullWidth
							label={'Mật khẩu hiện tại'}
							id="txt_pwdOld"
							name="pwdOld"
							type="password"
							onChange={handleChangePwdOld}
							required
						/>
						<Typography
							fontWeight={500}
							color={'GrayText'}
							variant="body2"
						>
							<span style={{ color: 'red' }}>*</span> Nhập lại mật khẩu hiện tại
						</Typography>
					</Box>
					<Box mt={3}>
						<TextField
							fullWidth
							label={'Mật khẩu mới'}
							id="txt_newPwd"
							name="newPwd"
							type="password"
							onChange={handleChangeNewPwd}
							required
						/>
						<Typography
							fontWeight={500}
							color={'GrayText'}
							variant="body2"
						>
							<span style={{ color: 'red' }}>*</span> Nhập mật khẩu mới muốn thay đổi
						</Typography>
					</Box>
					<Box mt={3}>
						<TextField
							fullWidth
							label={'Nhập lại mật khẩu mới'}
							id="txt_pwd"
							name="pwd"
							type="password"
							onChange={handleChangePwd}
							onBlur={hanldeCheckPwd}
							required
						/>
						<Typography
							fontWeight={500}
							color={'GrayText'}
							variant="body2"
						>
							<span style={{ color: 'red' }}>*</span> Nhập lại mật khẩu mới
						</Typography>
						<Alert
							severity="error"
							sx={{ display: pwdError ? 'flex' : 'none' }}
						>
							Nhập lại mật khẩu — <strong>chưa trùng khớp!</strong>
						</Alert>
					</Box>
				</Box>
				<Stack
					alignItems={'end'}
					marginTop={2}
				>
					<Button
						type="submit"
						variant="contained"
						color="warning"
					>
						Cập nhập
					</Button>
				</Stack>
			</Box>
			<Dialog
				onClose={handleClose}
				open={open}
			>
				<Alert severity="error">
					Kiểm tra lại - <strong>thông tin!</strong>
				</Alert>
			</Dialog>
		</Box>
	);
}

export default PasswordDesktop;
