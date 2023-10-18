import { useState, ChangeEvent, useEffect, FormEvent } from 'react';

import {
	Box,
	Stack,
	Paper,
	Typography,
	Avatar,
	Divider,
	Grid,
	TextField,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

interface PasswordDesktopProps {}

function PasswordDesktop({}: PasswordDesktopProps) {
	const [pwdOld, setPwdOld] = useState<string>('');
	const [newPwd, setNewPwd] = useState<string>('');
	const [pwd, setPwd] = useState<string>('');

	const handleChangePwdOld = (event: ChangeEvent<HTMLInputElement>) => {
		setPwdOld(event.target.value as string);
	};

	const handleChangeNewPwd = (event: ChangeEvent<HTMLInputElement>) => {
		setNewPwd(event.target.value as string);
	};
	const handleChangePwd = (event: ChangeEvent<HTMLInputElement>) => {
		setPwd(event.target.value as string);
	};

	const handleSubmitFormUpdate = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};
	return (
		<Box display={{ xs: 'none', lg: 'flex' }}>
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
					component={'form'}
					encType=""
					onSubmit={handleSubmitFormUpdate}
				>
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
								type="pwdOld"
								onChange={handleChangePwdOld}
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
								type="newPwd"
								onChange={handleChangeNewPwd}
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
								type="pwd"
								onChange={handleChangePwd}
							/>
							<Typography
								fontWeight={500}
								color={'GrayText'}
								variant="body2"
							>
								<span style={{ color: 'red' }}>*</span> Nhập lại mật khẩu mới
							</Typography>
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
			</Box>
		</Box>
	);
}

export default PasswordDesktop;
