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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { SelectChangeEvent } from '@mui/material/Select';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useAuth } from '~/hooks';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export interface ProfileDesktopProps {}

function ProfileDesktop({}: ProfileDesktopProps) {
	const { profile, updateUser } = useAuth();

	const [avatar, setAvatar] = useState<string>('');
	const [fileImage, setFileImage] = useState<File>();
	const [first_name, setFisrtName] = useState<string>('');
	const [last_name, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [gender, setGender] = useState<string>('');
	const [birthday, setBirthday] = useState<Date>(new Date());

	const [dataUpdated, setDataUpdated] = useState(false);

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if (profile) {
			setAvatar(profile?.data?.img_url);
			setFisrtName(profile?.data?.first_name);
			setLastName(profile?.data?.last_name);
			setEmail(profile?.data?.email);
			setGender(profile?.data?.gender);
			setBirthday(profile?.data?.birthday);
		}
	}, [profile, dataUpdated]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeFirstName = (event: ChangeEvent<{ value: unknown }>) => {
		setFisrtName(event.target.value as string);
	};

	const handleChangeLastName = (event: ChangeEvent<{ value: unknown }>) => {
		setLastName(event.target.value as string);
	};

	const handleChangeEmail = (event: ChangeEvent<{ value: unknown }>) => {
		setEmail(event.target.value as string);
	};

	const handleChangeGender = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	const handleChangeBirthday = (newDate: Date | null) => {
		if (newDate) {
			setBirthday(newDate);
		}
	};

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileImage(file);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setAvatar(reader.result as string);
			};
		}
	};

	const handleSubmitFormUpdate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const _id = profile?.data?._id;

		try {
			await updateUser({
				_id,
				email,
				first_name,
				last_name,
				gender,
				birthday,
				img_url: fileImage,
			});
			setDataUpdated(true);
		} catch (error: unknown) {
			console.log(error);
		}
		setOpen(false);
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
					Thông tin cá nhân
				</Typography>

				<Box
					component={Paper}
					mt={1}
					p={2}
				>
					<Stack
						direction={'row'}
						alignItems={'center'}
					>
						<Typography
							variant="h6"
							fontWeight={500}
							flexGrow={1}
						>
							Dữ liệu cá nhân
						</Typography>
						<Stack alignItems={'center'}>
							<Avatar
								src={avatar ? avatar : ''}
								sx={{ width: 45, height: 45 }}
							/>
							<Button component={'label'}>
								Thay đổi ảnh
								<input
									type="file"
									hidden
									onChange={handleChangeAvatar}
								/>
							</Button>
						</Stack>
					</Stack>

					<Divider sx={{ marginBottom: 2 }} />

					<Box my={1}>
						<Grid
							container
							spacing={2}
						>
							<Grid
								md={8}
								xs={12}
								item
							>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Họ tên lót'}
										id="txt_first_name"
										name="first_name"
										value={first_name ? first_name : ''}
										onChange={handleChangeFirstName}
									/>
								</Item>
							</Grid>
							<Grid
								item
								md={4}
								xs={12}
							>
								<Item elevation={0}>
									<TextField
										fullWidth
										label={'Tên'}
										id="txt_last_name"
										name="last_name"
										value={last_name ? last_name : ''}
										onChange={handleChangeLastName}
									/>
								</Item>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
							mt={1}
						>
							<Grid
								item
								md={6}
								xs={12}
							>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={gender ? gender : 'Male'}
										label="Giới tính"
										onChange={handleChangeGender}
									>
										<MenuItem value={'Male'}>Nam</MenuItem>
										<MenuItem value={'Female'}>Nữ</MenuItem>
										<MenuItem value={'Orther'}>Giới tính khác</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
							>
								<Stack>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DatePicker
											format="DD/MM/YYYY"
											disableFuture
											onChange={handleChangeBirthday}
										/>
									</LocalizationProvider>
								</Stack>
							</Grid>
						</Grid>
						<Box mt={3}>
							<TextField
								fullWidth
								label={'Địa chỉ E-mail'}
								id="txt_email"
								name="email"
								type="email"
								value={email ? email : ''}
								onChange={handleChangeEmail}
							/>
						</Box>
					</Box>
				</Box>
				<Stack
					alignItems={'end'}
					marginTop={2}
				>
					<Button
						onClick={handleClickOpen}
						variant="contained"
						color="warning"
					>
						Cập nhập
					</Button>
				</Stack>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Bạn có muốn cập nhật lại thông tin cá nhân?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Thông tin của bạn sẽ bị thay đổi khi nhấn xác nhận
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Đóng</Button>
					<Box
						component={'form'}
						onSubmit={handleSubmitFormUpdate}
					>
						<Button type="submit">Xác nhận</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default ProfileDesktop;
