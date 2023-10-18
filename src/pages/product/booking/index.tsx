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
} from '@mui/material';

import DomainIcon from '@mui/icons-material/Domain';

import BreakFastIcon from '~/images/icons8-cutlery-24.png';
import WifiIconIcon from '~/images/icons8-wifi-24.png';
import WinkingDocumentIcon from '~/images/icons8-winking-document-24.png';

import { BookingLayout } from '~/components/layout';
import { useAuth } from '~/hooks';
import { QuerySearchResult, RoomResult } from '~/models';
import { convertToVND, handleDateConvertVN, theme } from '~/utils';
import { hotelApi } from '~/api-client';

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
	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();

	const [arrId, setArrId] = useState<string[]>([]);
	const [nameRoom, setNameRoom] = useState<string>('');
	const [nameHotel, setNameHotel] = useState<string>('');
	const [daily, setDaily] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [priceSub, setPriceSub] = useState<string>('');
	const [totalPrice, setTotalPrice] = useState<string>('');

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);
		const roomBookings = JSON.parse(localStorage.getItem('roomBookings') as string);
		const nameHotel = JSON.parse(localStorage.getItem('nameHotel') as string);
		const discountString = localStorage.getItem('discount');
		const daily = localStorage.getItem('daily');
		const discount =
			typeof discountString === 'string' && discountString !== 'undefined'
				? JSON.parse(discountString)
				: null;

		const query = {
			...querySearch,
			check_in_date: new Date(querySearch.check_in_date),
			check_out_date: new Date(querySearch.check_out_date),
		};

		const arrRooms: RoomResult[] = Object.values(roomBookings);

		let arrID: string[] = [];
		let price: number = 0;
		arrRooms.map((room) => {
			price += parseInt(room.price);
			arrID = [...arrID, room._id];
			setNameRoom(room.id_roomType.name);
		});

		if (!!discount) {
			switch (discount?.discount_type) {
				case 'percentage':
					setPriceSub(`${discount?.discount} %`);
					break;
				case 'fixed':
					setPriceSub(`${discount?.discount} đ`);
					break;
				default:
					break;
			}
		}

		let totalPrice = 0;
		let price1 = 0;
		if (daily) {
			totalPrice = discount
				? discount.discount_type === 'percentage'
					? price * parseInt(daily) -
					  Math.min((discount.discount * price * parseInt(daily)) / 100, discount.price_max)
					: discount.discount_type === 'fixed'
					? price * parseInt(daily) - discount.price_max
					: price
				: price * parseInt(daily);

			setDaily(daily);
			price1 = price * parseInt(daily);
		}

		setNameHotel(nameHotel);
		setTotalPrice(totalPrice.toString());
		setQuerySearch(query);

		setPrice(price1.toString());
		setArrId(arrID);
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const hanleSubmitBooking = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const dataCustomer = {
			id_customer: profile?.data._id,
			first_name: firstName,
			last_name: lastName,
			phone: phone,
			email: email,
			name_customer: customer,
			id_room: arrId,
			note: note,
			check_in_date: querySearch?.check_in_date,
			check_out_date: querySearch?.check_out_date,
			number_adults: querySearch?.number_adults,
			number_children: querySearch?.number_children,
			number_room: querySearch?.number_room,
			total_price: totalPrice,
		};

		const priceBooking = {
			daily: daily,
			price: price,
			priceSub: priceSub,
			totalPrice: totalPrice,
		};

		const booking = async () => {
			const { data } = await hotelApi.booking(dataCustomer);
			localStorage.setItem('verification', JSON.stringify(data));
		};
		booking();
		localStorage.setItem('dataCustomer', JSON.stringify(dataCustomer));
		localStorage.setItem('priceBooking', JSON.stringify(priceBooking));

		setTimeout(() => {
			router.push('/product/booking/review');
		}, 1000);
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
								src={''}
								sx={{ mr: 1 }}
							/>
							<Box>
								<Typography
									fontWeight={500}
									component={'h6'}
								>
									Thông tin cá nhân của {profile?.data.first_name} {profile?.data.last_name}
								</Typography>
								<Typography
									fontWeight={500}
									color={'GrayText'}
								>
									Sdt: {profile?.data.phone}
								</Typography>
							</Box>
						</Box>

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
											onChange={(event) => setLastName(event.target.value)}
											required
										/>
									</Grid>
								</Grid>
								<Typography
									variant="body2"
									color={'GrayText'}
									marginTop={1}
									marginBottom={2}
								>
									* Nhập tên như trên CMND/hộ chiếu (không dấu)
								</Typography>
								<Grid
									container
									spacing={1}
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
								Tên khách hàng
							</Typography>
							<Box
								marginTop={2}
								component={Paper}
								padding={2}
							>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Tên khách hàng"
									variant="outlined"
									type="text"
									name="name_customer"
									onChange={(event) => setCustomer(event.target.value)}
								/>
							</Box>
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
								<Stack direction={'row'}>
									<Typography
										variant="body1"
										fontWeight={400}
										flexGrow={1}
									>
										{arrId.length}x phòng {nameRoom} <span style={{ color: 'blue' }}>(1 đêm)</span>
									</Typography>
									<Typography fontWeight={500}>{convertToVND(parseInt(price))}</Typography>
								</Stack>

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
								</Stack>

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
						>
							<Typography
								color={'GrayText'}
								width={'50%'}
								flexGrow={1}
							>
								Khi nhấn vào nút này bạn công nhận mình đã đọc và đồng ý với các{' '}
								<Link href={'/'}>Điều khoản & Điều kiện</Link> và{' '}
								<Link href={'/'}>Chính sách quyền riêng tư</Link> của Chúng tôi
							</Typography>
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
									<Typography fontWeight={500}>{nameRoom}</Typography>
									<Stack direction={'row'}>
										<Typography
											color={'GrayText'}
											display={'flex'}
											variant="body2"
										>
											khách/phòng{' '}
										</Typography>
										<Typography
											fontWeight={500}
											color={'initial'}
											marginX={1}
											variant="body2"
										>
											4 khách
										</Typography>
									</Stack>
								</Box>

								<Stack
									direction={'row'}
									spacing={1}
								>
									<Image
										src={BreakFastIcon}
										alt=""
									/>
									<Typography color={'green'}>Bữa ăn sáng </Typography>
								</Stack>

								<Stack
									direction={'row'}
									spacing={1}
								>
									<Image
										src={WifiIconIcon}
										alt=""
									/>
									<Typography color={'green'}>Wifi miễn phí </Typography>
								</Stack>
							</Box>

							<Divider sx={{ my: 2 }} />

							<Box padding={2}>
								<Stack
									direction={'row'}
									spacing={1}
								>
									<Image
										src={WinkingDocumentIcon}
										alt=""
									/>
									<Typography>Không hoàn tiền</Typography>
								</Stack>
							</Box>
						</Box>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}

export default BookingPage;

BookingPage.Layout = BookingLayout;
