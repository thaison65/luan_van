import React, { useState, ChangeEvent, MouseEvent, FormEvent, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
	Box,
	Button,
	FormControl,
	Paper,
	Stack,
	TextField,
	Typography,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Divider,
	Grid,
	FormHelperText,
	Dialog,
	Alert,
	AlertTitle,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import GoogleIcon from '~/images/google-icon-1.png';

import { InvalidPhoneException, InvalidPasswordException } from '~/utils';
import { useAuth } from '~/hooks';
import { theme } from '~/utils';

export interface FormValues {
	phone: string;
	password: string;
}

export interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
	const router = useRouter();
	const { login } = useAuth({ revalidateOnMount: false });

	const [showPassword, setShowPassword] = useState<Boolean>(false);
	const [phone, setPhone] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [phoneError, setPhoneError] = useState<string>('');
	const [pwdError, setPwdError] = useState<string>('');

	const [alertFail, setAlertFail] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleChangePhone = (event: ChangeEvent<{ value: unknown }>) => {
		setPhone(event.target.value as string);
	};

	const handleChangePassword = (event: ChangeEvent<{ value: unknown }>) => {
		setPassword(event.target.value as string);
	};

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleOpenAlert = () => {
		setOpenAlert(true);
	};
	const handleCloseAlert = () => {
		setOpenAlert(false);
		if (!alertFail) {
			router.push('/');
		}
	};

	const handleSubmintLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await login({ phone, password });
			handleOpenAlert();
		} catch (error: unknown) {
			if (error instanceof InvalidPhoneException) {
				setPhoneError(error.message);
				console.log(error.message);
				return;
			}
			if (error instanceof InvalidPasswordException) {
				setPwdError(error.message);
				console.log(error.message);
				return;
			}
			console.log(error + ' login page');
			setAlertFail(true);
			handleOpenAlert();
		}
	};

	return (
		<Box bgcolor={theme.palette.primary.main}>
			<Dialog
				open={openAlert}
				onClose={handleCloseAlert}
			>
				<Alert
					sx={{ fontSize: 16 }}
					severity={alertFail ? 'error' : 'success'}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={handleCloseAlert}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					<AlertTitle>Đăng nhập {alertFail ? 'thất bại' : 'thành công'}</AlertTitle>
					Bạn đã{' '}
					<strong>{alertFail ? 'Sai tài khoản hoặc mật khẩu' : 'Đăng nhập thành công'}!</strong>
				</Alert>
			</Dialog>
			<Link href={'/'}>
				<Button
					startIcon={<ArrowBackIcon />}
					sx={{ color: '#ffffff', fontSize: 16, margin: 1 }}
				>
					Quay lại trang chủ
				</Button>
			</Link>
			<Stack
				component={'form'}
				method="POST"
				onSubmit={handleSubmintLogin}
				minHeight={'100vh'}
				direction={'row'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Stack
					component={Paper}
					elevation={4}
					direction={'column'}
					alignItems={'center'}
					justifyContent={'center'}
					minWidth={'30vw'}
					spacing={2}
					padding={4}
					borderRadius={4}
				>
					<Typography
						variant="h4"
						component={'h1'}
						fontWeight={500}
						color={'#7f7f7f'}
					>
						Đăng nhập
					</Typography>

					<Stack
						spacing={2}
						width={'100%'}
					>
						<TextField
							fullWidth
							label={'Số điện thoại'}
							id="txt_phone"
							name="phone"
							onChange={handleChangePhone}
							error={phoneError ? true : false}
							helperText={phoneError}
							onFocus={() => setPhoneError('')}
						/>
						<FormControl
							sx={{ m: 1 }}
							variant="outlined"
							error={pwdError ? true : false}
						>
							<InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
							<OutlinedInput
								fullWidth
								id="outlined-adornment-password"
								type={showPassword ? 'text' : 'password'}
								name="password"
								onChange={handleChangePassword}
								onFocus={() => setPwdError('')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Mật khẩu"
							/>
							<FormHelperText>{pwdError}</FormHelperText>
						</FormControl>
						<Box
							display={'flex'}
							justifyContent={'end'}
						>
							<Link
								style={{ textDecoration: 'none' }}
								href={'/recover'}
							>
								<Typography
									color={'#7f7f7f'}
									sx={{ ':hover': { color: '#1976d2' } }}
								>
									Bạn quên mật khẩu?
								</Typography>
							</Link>
						</Box>
						<Stack direction={'row'}>
							<Box
								flexGrow={1}
								display={'flex'}
								alignItems={'center'}
							>
								<Link
									style={{ textDecoration: 'none' }}
									href={'/register'}
								>
									<Typography
										color={theme.palette.primary.main}
										sx={{
											':hover': { color: '#7f7f7f', textDecoration: 'underline' },
											flexGrow: 0,
										}}
									>
										Tạo tài khoản
									</Typography>
								</Link>
							</Box>
							<Button
								variant="contained"
								sx={{ paddingX: 2 }}
								type="submit"
							>
								Đăng nhập
							</Button>
						</Stack>

						<Divider />
						<Box>
							<Typography
								color={'#7f7f7f'}
								textAlign={'center'}
								mb={2}
							>
								Hoặc đăng nhập bằng
							</Typography>
							<Grid
								container
								spacing={1}
							>
								<Grid
									item
									md={6}
									xs={12}
								>
									<Box
										component={Button}
										fullWidth
										variant="outlined"
									>
										<Image
											src={GoogleIcon}
											alt="Google Icon"
											style={{ width: '15px', height: '15px', marginRight: '8px' }}
										/>
										Google
									</Box>
								</Grid>
								<Grid
									item
									md={6}
									xs={12}
								>
									<Button
										fullWidth
										variant="contained"
										sx={{ bgcolor: '#3B5998' }}
										startIcon={<FacebookIcon />}
									>
										FaceBook
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}

export default LoginPage;
