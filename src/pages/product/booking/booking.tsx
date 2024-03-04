import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	Box,
	Typography,
	Container,
	Paper,
	Avatar,
	TextField,
	Grid,
	Stack,
	FormControl,
	Radio,
	RadioGroup,
	Divider,
	Button,
	FormControlLabel,
	Dialog,
	Alert,
	Snackbar,
} from '@mui/material';

import DomainIcon from '@mui/icons-material/Domain';

import BreakFastIcon from '~/images/icons8-cutlery-24.png';
import WifiIconIcon from '~/images/icons8-wifi-24.png';
import WinkingDocumentIcon from '~/images/icons8-winking-document-24.png';

import { BookingLayout } from '~/components/layout';
import { useAuth } from '~/hooks';
import { GroupedRoom, ImageResult, QuerySearchResult, RoomResult } from '~/models';
import {
	InvalidEmailException,
	InvalidFirstNameException,
	InvalidLastNameException,
	InvalidPhoneException,
	convertToVND,
	groupedRooms,
	handleDateConvertVN,
	theme,
	validateEmail,
	validateFirstName,
	validateLastName,
	validatePhone,
} from '~/utils';

interface BookingPageProps {}

function BookingPage({}: BookingPageProps) {
	const { profile } = useAuth();
	const router = useRouter();

	const [selectedValue, setSelectedValue] = useState<string>('me');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [customer, setCustomer] = useState<string>('');
	const [phoneCustomer, setPhoneCustomer] = useState<string>('');
	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();

	const [rooms, setRooms] = useState<GroupedRoom[]>();
	const [numberRoom, setNumberRoom] = useState<number>(0);

	const [image, setImage] = useState<ImageResult>({ _id: '', img_url: '' });
	const [nameHotel, setNameHotel] = useState<string>('');
	const [daily, setDaily] = useState<string>('');
	const [totalPrice, setTotalPrice] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);
	const [titleErr, setTitleErr] = useState<string>('');

	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);
		const roomBookings = JSON.parse(localStorage.getItem('roomBookings') as string);
		const roomsType = JSON.parse(localStorage.getItem('roomsType') as string);
		const nameHotel = JSON.parse(localStorage.getItem('nameHotel') as string);
		const priceRoom = JSON.parse(localStorage.getItem('priceRoom') as string);
		const imgRoom = JSON.parse(localStorage.getItem('imgRoom') as string);
		const daily = localStorage.getItem('daily');

		// const discountString = localStorage.getItem('discount');
		// const discount =
		// 	typeof discountString === 'string' && discountString !== 'undefined'
		// 		? JSON.parse(discountString)
		// 		: null;

		const query = {
			...querySearch,
			check_in_date: new Date(querySearch.check_in_date),
			check_out_date: new Date(querySearch.check_out_date),
		};

		if (!!roomBookings) {
			const arrRooms: RoomResult[] = Object.values(roomBookings);

			setRooms(groupedRooms(arrRooms));
			setNumberRoom(arrRooms.length);
		}

		// if (!!discount) {
		// 	switch (discount?.discount_type) {
		// 		case 'percentage':
		// 			setPriceSub(`${discount?.discount} %`);
		// 			break;
		// 		case 'fixed':
		// 			setPriceSub(`${discount?.discount} đ`);
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// }

		if (daily) {
			// totalPrice = discount
			// 	? discount.discount_type === 'percentage'
			// 		? price * parseInt(daily) -
			// 		  Math.min((discount.discount * price * parseInt(daily)) / 100, discount.price_max)
			// 		: discount.discount_type === 'fixed'
			// 		? price * parseInt(daily) - discount.price_max
			// 		: price
			// 	: price * parseInt(daily);
			setDaily(daily);
		}

		setImage(imgRoom);
		setNameHotel(nameHotel);
		setTotalPrice(priceRoom);
		setQuerySearch(query);
	}, []);

	useEffect(() => {
		if (!!profile) {
			setFirstName(profile.data.first_name);
			setLastName(profile.data.last_name);
			setPhone(profile.data.phone);
			setEmail(profile.data.email);
		}
	}, [profile]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const hanleSubmitBooking = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			validatePhone(phone);
			validateEmail(email);
			validateFirstName(firstName);
			validateLastName(lastName);

			const dataCustomer = {
				id_customer: profile?.data._id,
				first_name: firstName,
				last_name: lastName,
				phone: phone,
				email: email,
				name_customer: customer,
				phone_customer: phoneCustomer,
				note: note,
				image: image,
				number_adults: querySearch?.number_adults,
				number_children: querySearch?.number_children,
				number_room: querySearch?.number_room,
				total_price: totalPrice,
			};

			const priceBooking = {
				daily: daily,
				totalPrice: totalPrice,
			};

			localStorage.setItem('dataCustomer', JSON.stringify(dataCustomer));
			localStorage.setItem('priceBooking', JSON.stringify(priceBooking));

			setOpenSnackbar(true);

			setTimeout(() => {
				router.push('/product/booking/review');
			}, 1000);
		} catch (error: unknown) {
			if (error instanceof InvalidFirstNameException) {
				setOpen(true);
				setTitleErr(error.message);
				return;
			}
			if (error instanceof InvalidLastNameException) {
				setOpen(true);
				setTitleErr(error.message);
				return;
			}
			if (error instanceof InvalidPhoneException) {
				setOpen(true);
				setTitleErr(error.message);
				return;
			}
			if (error instanceof InvalidEmailException) {
				setOpen(true);
				setTitleErr(error.message);
				return;
			}
		}
	};

	return (
		<Box
			component={'form'}
			marginBottom={2}
			onSubmit={hanleSubmitBooking}
		>
			<Container>
				<Typography
					variant="h4"
					fontWeight={600}
					marginY={2}
				>
					Đặt phòng khách sạn
				</Typography>

				<Typography
					fontWeight={500}
					color={'GrayText'}
				>
					{' '}
					Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác trước khi tiến hành thanh
					toán.
				</Typography>

				<Stack
					direction={'row'}
					spacing={2}
				>
					<Box width={'70%'}>
						{profile?.data && (
							<Box
								component={Paper}
								display={'flex'}
								justifyContent={'start'}
								alignItems={'center'}
								padding={2}
								marginY={2}
							>
								<Avatar
									alt="anh dai dien"
									src={profile?.data.img_url}
									sx={{ mr: 1 }}
								/>
								<Box>
									<Typography
										fontWeight={500}
										component={'h6'}
									>
										Thông tin cá nhân của {profile?.data.first_name} {profile?.data.lastName}
									</Typography>
									<Typography
										fontWeight={500}
										color={'GrayText'}
									>
										Sdt: {profile?.data.phone}
									</Typography>
								</Box>
							</Box>
						)}

						<Box marginTop={4}>
							<Typography
								variant="h5"
								fontWeight={500}
							>
								Chi tiết liên hệ
							</Typography>

							<Box
								component={Paper}
								padding={2}
								marginTop={2}
							>
								<Grid
									container
									spacing={1}
								>
									<Grid
										item
										xs={12}
										md={6}
									>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Họ tên lót"
											variant="outlined"
											type="text"
											name="first_name"
											autoFocus={true}
											value={firstName ? firstName : ''}
											onChange={(event) => setFirstName(event.target.value)}
											required
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={6}
									>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Tên "
											variant="outlined"
											type="text"
											name="last_name"
											value={lastName}
											onChange={(event) => setLastName(event.target.value)}
											required
										/>
									</Grid>
								</Grid>

								<Grid
									container
									spacing={1}
									marginTop={2}
								>
									<Grid
										item
										xs={12}
										md={4}
									>
										<TextField
											fullWidth
											id="outlined-basic"
											label="Số điện thoại"
											variant="outlined"
											type="text"
											name="phone"
											value={phone}
											onChange={(event) => setPhone(event.target.value)}
											required
										/>
										<Typography
											variant="body2"
											color={'GrayText'}
											marginTop={1}
											marginBottom={2}
										>
											VD: 0912345678
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
										md={8}
									>
										<TextField
											fullWidth
											id="outlined-basic"
											label="E-mail"
											variant="outlined"
											type="email"
											name="email"
											value={email}
											onChange={(event) => setEmail(event.target.value)}
											required
										/>
										<Typography
											variant="body2"
											color={'GrayText'}
											marginTop={1}
											marginBottom={2}
										>
											VD: email@example.com
										</Typography>
									</Grid>
								</Grid>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Ghi chú"
									variant="outlined"
									type="text"
									name="note"
									onChange={(event) => setNote(event.target.value)}
								/>
								<Typography
									variant="body2"
									color={'GrayText'}
									marginTop={1}
									marginBottom={2}
								>
									VD: Nhận phòng trễ hơn dự kiến
								</Typography>

								<Box component={FormControl}>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="me"
										name="radio-buttons-group"
									>
										<Stack
											direction={'row'}
											spacing={1}
										>
											<FormControlLabel
												control={
													<Radio
														onChange={handleChange}
														checked={selectedValue === 'me'}
														value="me"
													/>
												}
												label="Tôi là khách lưu trú"
											/>
											<FormControlLabel
												control={
													<Radio
														onChange={handleChange}
														checked={selectedValue === 'friend'}
														value="friend"
													/>
												}
												label="Tôi đặt giúp cho người khách"
											/>
										</Stack>
									</RadioGroup>
								</Box>
							</Box>
						</Box>

						<Box
							display={{ md: selectedValue === 'friend' ? 'block' : 'none' }}
							marginTop={4}
						>
							<Typography
								variant="h6"
								fontWeight={500}
							>
								Thông tin khách hàng được đặt giúp
							</Typography>
							<Stack
								marginTop={2}
								component={Paper}
								spacing={2}
								padding={2}
							>
								<Box>
									<TextField
										fullWidth
										id="outlined-basic"
										label="Tên khách hàng"
										variant="outlined"
										type="text"
										name="name_customer"
										onChange={(event) => setCustomer(event.target.value)}
									/>
									<Typography
										variant="body2"
										color={'GrayText'}
										marginTop={1}
										marginBottom={2}
									>
										Tên khách hàng được đặt giúp. VD: Nguyễn Văn A
									</Typography>
								</Box>

								<Box>
									<TextField
										fullWidth
										id="outlined-basic"
										label="Số điện thoại khách hàng"
										variant="outlined"
										type="text"
										name="name_customer"
										onChange={(event) => setPhoneCustomer(event.target.value)}
									/>
									<Typography
										variant="body2"
										color={'GrayText'}
										marginTop={1}
										marginBottom={2}
									>
										Số điện thoại khách hàng được đặt giúp. VD: 091234568
									</Typography>
								</Box>
							</Stack>
						</Box>

						<Box marginTop={4}>
							<Typography
								variant="h6"
								fontWeight={500}
							>
								Chính sách hủy đặt phòng
							</Typography>
							<Box
								component={Paper}
								padding={2}
								marginTop={2}
							>
								<Typography
									variant="body1"
									fontWeight={400}
									color={'GrayText'}
								>
									Đặt phòng này không thể hoàn tiền và không thể đổi lịch.
								</Typography>
							</Box>
						</Box>

						<Box>
							<Typography
								variant="h6"
								fontWeight={500}
								marginTop={4}
							>
								Chi tiết giá
							</Typography>

							<Box
								component={Paper}
								padding={2}
								marginTop={2}
							>
								<Stack
									direction={'row'}
									justifyContent={'space-between'}
								>
									<Stack
										direction={'row'}
										spacing={1}
									>
										<Typography
											variant="body1"
											fontWeight={400}
											flexGrow={1}
										>
											{rooms &&
												rooms.map((room) => {
													return (
														<Typography
															key={room.roomType._id}
															component={'span'}
														>
															{room.count}x {room.roomType.name}
														</Typography>
													);
												})}
										</Typography>
										<Typography
											component={'span'}
											style={{ color: 'blue' }}
										>
											({daily} đêm)
										</Typography>
									</Stack>
									<Typography fontWeight={500}>{convertToVND(parseInt(totalPrice))}</Typography>
								</Stack>
								{/* 
									<Stack
										direction={'row'}
										marginTop={2}
									>
										<Typography
											variant="body1"
											fontWeight={400}
											flexGrow={1}
										>
											Số tiền giảm
										</Typography>
										<Typography fontWeight={500}>{priceSub}</Typography>
									</Stack> */}

								<Divider sx={{ marginY: 2 }} />

								<Stack
									direction={'row'}
									color={theme.palette.primary.main}
								>
									<Typography
										variant="body1"
										fontWeight={600}
										flexGrow={1}
									>
										Thành tiền
									</Typography>
									<Typography fontWeight={600}>{convertToVND(parseInt(totalPrice))}</Typography>
								</Stack>
							</Box>
						</Box>

						<Stack
							direction={'row'}
							marginY={2}
							justifyContent={'end'}
						>
							<Button
								variant="contained"
								color="warning"
								sx={{ flexGrow: 0 }}
								type="submit"
							>
								Tiếp tục
							</Button>
						</Stack>
					</Box>
					<Box width={'30%'}>
						<Box
							component={Paper}
							marginY={2}
						>
							<Box
								padding={2}
								display={'flex'}
							>
								<DomainIcon color="primary" />
								<Typography
									mx={2}
									fontWeight={600}
									component={'h6'}
								>
									{nameHotel}
								</Typography>
							</Box>

							<Box
								bgcolor={'#F8F7F9'}
								padding={2}
							>
								<Typography
									color={'GrayText'}
									variant="body2"
								>
									Ngày nhận phòng:
								</Typography>
								<Typography
									fontWeight={500}
									color={'initial'}
									marginX={1}
								>
									{handleDateConvertVN(querySearch?.check_in_date as Date)}
								</Typography>
								<Typography
									color={'GrayText'}
									variant="body2"
								>
									Ngày trả phòng:{' '}
								</Typography>
								<Typography
									fontWeight={500}
									color={'initial'}
									marginX={1}
								>
									{handleDateConvertVN(querySearch?.check_out_date as Date)}
								</Typography>
							</Box>

							<Box padding={2}>
								<Box marginBottom={2}>
									<Typography
										variant="body1"
										fontWeight={400}
										flexGrow={1}
									>
										{rooms &&
											rooms.map((room) => {
												return (
													<Typography
														key={room.roomType._id}
														component={'span'}
													>
														{room.count}x {room.roomType.name}
													</Typography>
												);
											})}
									</Typography>
									{image.img_url && (
										<Image
											src={image.img_url}
											alt="photo of room"
											width={100}
											height={100}
										/>
									)}
									<Stack direction={'row'}>
										<Typography
											color={'GrayText'}
											display={'flex'}
											variant="body2"
										>
											Số lượng khách:{' '}
										</Typography>
										<Typography
											fontWeight={500}
											color={'initial'}
											marginX={1}
											variant="body2"
										>
											{querySearch?.number_adults +
												' người lớn và ' +
												querySearch?.number_children?.length +
												' trẻ em'}
										</Typography>
									</Stack>
									<Typography
										variant="body2"
										color={'GrayText'}
									>
										Số lượng phòng đã đặt:{' '}
										<Typography
											fontWeight={600}
											color={'ButtonText'}
											variant="body2"
											component={'span'}
										>
											{numberRoom} phòng
										</Typography>
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Stack>
			</Container>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<Alert severity="error">{titleErr}</Alert>
			</Dialog>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					severity="success"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Thông tin đơn đặt phòng đã được lưu
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default BookingPage;

BookingPage.Layout = BookingLayout;
