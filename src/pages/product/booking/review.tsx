import React, { useEffect, useState } from 'react';
import {
	Box,
	Stack,
	Container,
	Paper,
	Button,
	Typography,
	Divider,
	Menu,
	MenuItem,
} from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import { BookingLayout } from '~/components/layout';
import { QuerySearchResult, CustomerResult, Verification, RoomResult } from '~/models';
import { handleDateConvertVN, theme, convertToVND } from '~/utils';

import Payload from '~/components/product/pay/paypal';
import { hotelApi } from '~/api-client';

interface ReviewBookingPageProps {}

interface PriceBooking {
	daily: number;
	price: number;
	priceSub: number;
	totalPrice: number;
}

const initialOptions = {
	clientId: 'AQSFLzjoGZRHoBU1CQeP5DSaSkmxzOU6kAgOTUN6m9AOr50HvIXsL7M0Xc5W9DZWg1KgGsZTAvP1r3o7',
	currency: 'USD',
	intent: 'capture',
};

function ReviewBookingPage({}: ReviewBookingPageProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();
	const [dataCustomer, setDataCustomer] = useState<CustomerResult>();
	const [roomBookings, setRoomBookings] = useState<RoomResult[]>([]);
	const [priceBooking, setPriceBooking] = useState<PriceBooking>();
	const [verification, setVerification] = useState<Verification | undefined>(undefined);

	useEffect(() => {
		const verificationString = localStorage.getItem('verification');
		if (verificationString) {
			const parsedVerification = JSON.parse(verificationString);
			setVerification(parsedVerification);
		}
	}, []);

	const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({
		minutes: 20,
		seconds: 0,
	});
	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);
		const dataCustomer = JSON.parse(localStorage.getItem('dataCustomer') as string);
		const roomBookings = JSON.parse(localStorage.getItem('roomBookings') as string);
		const priceBooking = JSON.parse(localStorage.getItem('priceBooking') as string);

		const query = {
			...querySearch,
			check_in_date: new Date(querySearch.check_in_date),
			check_out_date: new Date(querySearch.check_out_date),
		};
		setQuerySearch(query);
		setDataCustomer(dataCustomer);
		setRoomBookings(roomBookings);
		setPriceBooking(priceBooking);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft.seconds === 0) {
					if (prevTimeLeft.minutes === 0) {
						clearInterval(interval);
						return prevTimeLeft;
					} else {
						return {
							minutes: prevTimeLeft.minutes - 1,
							seconds: 59,
						};
					}
				} else {
					return {
						minutes: prevTimeLeft.minutes,
						seconds: prevTimeLeft.seconds - 1,
					};
				}
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
			// Call API function here
			console.log('API called!');
		}
	}, [timeLeft]);

	const displayTime = `${timeLeft.minutes < 10 ? '0' : ''}${timeLeft.minutes}:${
		timeLeft.seconds < 10 ? '0' : ''
	}${timeLeft.seconds}`;

	const handleClickPay = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClosePay = () => {
		setAnchorEl(null);
	};

	const handleClickCofirm = async () => {
		const id_booking = verification?.id;
		const check_in_date = querySearch?.check_in_date;
		const check_out_date = querySearch?.check_out_date;
		let id_rooms: string[] = [];
		roomBookings.map((room) => {
			id_rooms.push(room._id);
		});

		const data = {
			id_booking: id_booking,
			id_rooms: id_rooms,
			check_in_date: check_in_date,
			check_out_date: check_out_date,
		};

		try {
			await hotelApi.confirm(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<PayPalScriptProvider options={initialOptions}>
			<Container>
				<Box marginY={4}>
					<Typography
						marginY={1}
						variant="h5"
						fontWeight={700}
					>
						Bạn vui lòng kiểm tra lại đặt phòng
					</Typography>
					<Typography
						fontWeight={500}
						color={'GrayText'}
						variant="body2"
					>
						Vui lòng xem lại chi tiết đặt phòng của bạn trước khi xác nhận hoặc thanh toán
					</Typography>
				</Box>

				<Stack
					direction={'row'}
					spacing={2}
					marginY={2}
				>
					<Box width={'70%'}>
						<Box
							component={Paper}
							padding={2}
						>
							<Stack
								margin={2}
								direction={'row'}
								spacing={2}
							>
								<Box
									component={Paper}
									width={250}
									height={150}
								>
									<Typography>Hình ảnh</Typography>
								</Box>
								<Box>
									<Typography
										variant="h6"
										fontWeight={600}
									>
										Khách sạn Hoàng hôn
									</Typography>

									<Divider />
									<Box>
										<Stack
											direction={'row'}
											marginY={1}
										>
											<Typography fontWeight={500}>Ngày nhận phòng: </Typography>
											<Typography
												ml={1}
												color={'GrayText'}
											>
												{handleDateConvertVN(querySearch?.check_in_date as Date)}
											</Typography>
										</Stack>
										<Stack
											direction={'row'}
											marginY={1}
										>
											<Typography fontWeight={500}>Ngày trả phòng: </Typography>
											<Typography
												ml={1}
												color={'GrayText'}
											>
												{handleDateConvertVN(querySearch?.check_out_date as Date)}
											</Typography>
										</Stack>
									</Box>
								</Box>
							</Stack>

							<Divider />

							<Stack
								direction={'row'}
								spacing={2}
							>
								<Box>
									<Typography
										variant="h6"
										fontWeight={600}
									>
										{roomBookings[0]?.id_roomType.name}
									</Typography>
									<Box marginX={2}>
										<Stack
											direction={'row'}
											marginY={1}
										>
											<Typography fontWeight={500}>khách/phòng: </Typography>
											<Typography
												ml={1}
												color={'GrayText'}
											>
												{roomBookings[0]?.capacity} khách
											</Typography>
										</Stack>
										<Stack
											direction={'row'}
											marginY={1}
										>
											<Typography fontWeight={500}>kiểu giường: </Typography>
											<Typography
												ml={1}
												color={'GrayText'}
											>
												{roomBookings[0]?.beds} giường đôi
											</Typography>
										</Stack>
									</Box>
								</Box>
								<Box>
									<Box
										marginTop={2}
										component={Paper}
										width={120}
										height={100}
									>
										<Typography>Hình ảnh</Typography>
									</Box>
								</Box>
								<Box>
									<Stack
										spacing={1}
										margin={2}
									>
										<Stack direction={'row'}>
											<RestaurantIcon color="success" />
											<Typography
												marginX={1}
												color={'green'}
												fontWeight={500}
											>
												Có phụ vụ bữa sáng
											</Typography>
										</Stack>
										<Stack direction={'row'}>
											<WifiIcon color="success" />
											<Typography
												marginX={1}
												color={'green'}
												fontWeight={500}
											>
												Có phụ vụ bữa sáng
											</Typography>
										</Stack>
									</Stack>
								</Box>
							</Stack>
						</Box>

						<Box
							component={Paper}
							padding={2}
							marginY={2}
						>
							<Typography
								variant="h6"
								fontWeight={600}
							>
								Chính sách khách sạn & phòng
							</Typography>
							<Divider sx={{ marginY: 2 }} />
							<Typography>Chính sách hủy phòng & đổi lịch</Typography>
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
										{roomBookings[0]?.id_roomType.name} x{querySearch?.number_room}
										<span style={{ color: 'blue' }}>( đêm)</span>
									</Typography>
									<Typography fontWeight={400}>{priceBooking?.price} VND</Typography>
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
									<Typography fontWeight={400}>{priceBooking?.priceSub}</Typography>
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
									<Typography fontWeight={600}>{priceBooking?.totalPrice} VND</Typography>
								</Stack>
							</Box>
						</Box>

						<Box
							display={'flex'}
							justifyContent={'end'}
							marginY={2}
						>
							<Box>
								<Typography
									variant="body2"
									fontWeight={500}
									color={'GrayText'}
									textAlign={'end'}
								>
									Bạn không có thay đổi thông tin thì có thể thanh toán hoặc xác nhận để đặt phòng
								</Typography>
								<Box
									my={1}
									display={'flex'}
									justifyContent={'end'}
								>
									<Button
										variant="contained"
										sx={{ marginX: 2 }}
										color={'info'}
										onClick={handleClickPay}
									>
										Chọn phương thức thanh toán
									</Button>
									<Menu
										id="basic-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={handleClosePay}
										MenuListProps={{
											'aria-labelledby': 'basic-button',
										}}
									>
										<MenuItem onClick={handleClosePay}>
											<Payload />
										</MenuItem>
									</Menu>

									<Button
										variant="contained"
										color={'warning'}
										onClick={handleClickCofirm}
									>
										Xác nhận
									</Button>
								</Box>
							</Box>
						</Box>
					</Box>

					<Box width={'30%'}>
						<Box
							component={Paper}
							padding={2}
						>
							<Typography
								variant="h6"
								fontWeight={600}
							>
								Thông tin liên hệ
							</Typography>
							<Divider />
							<Stack
								spacing={1}
								marginTop={2}
								marginX={2}
							>
								<Stack direction={'row'}>
									<Typography fontWeight={500}>Tên khách hàng: </Typography>
									<Typography
										ml={1}
										color={'GrayText'}
									>
										{dataCustomer?.first_name} {dataCustomer?.last_name}
									</Typography>
								</Stack>
								<Stack direction={'row'}>
									<Typography fontWeight={500}>Email: </Typography>
									<Typography
										ml={1}
										color={'GrayText'}
									>
										{dataCustomer?.email}
									</Typography>
								</Stack>
								<Stack direction={'row'}>
									<Typography fontWeight={500}>Số điện thoại: </Typography>
									<Typography
										ml={1}
										color={'GrayText'}
									>
										{dataCustomer?.phone}
									</Typography>
								</Stack>
							</Stack>
						</Box>
						<Box
							component={Paper}
							marginY={2}
							padding={2}
						>
							<Typography
								variant="h6"
								fontWeight={600}
							>
								Chi tiết khách ở
							</Typography>
							<Divider />
							<Box margin={2}>
								{dataCustomer?.customer !== '' ? (
									<Stack direction={'row'}>
										<Typography fontWeight={500}>Tên khách ở: </Typography>
										<Typography
											ml={1}
											color={'GrayText'}
										>
											{dataCustomer?.customer}
										</Typography>
									</Stack>
								) : (
									<Stack direction={'row'}>
										<Typography fontWeight={500}>Tên khách ở: </Typography>
										<Typography
											ml={1}
											color={'GrayText'}
										>
											{dataCustomer?.first_name} {dataCustomer?.last_name}
										</Typography>
									</Stack>
								)}

								<Stack direction={'row'}>
									<Typography fontWeight={500}>Ghi chú: </Typography>
									<Typography
										ml={1}
										color={'GrayText'}
									>
										{dataCustomer?.note}
									</Typography>
								</Stack>
							</Box>
						</Box>

						<Box marginY={2}>
							<Typography fontWeight={500}>Thời gian để xem xét thông tin</Typography>
							<Typography
								fontWeight={500}
								color={'GrayText'}
							>
								{displayTime}
							</Typography>
							<Typography
								variant="body2"
								fontWeight={200}
								color={'GrayText'}
							>
								Nếu hết thời gian bạn không xác nhận thì đơn đặt phòng sẽ bị hủy bỏ
							</Typography>
						</Box>
					</Box>
				</Stack>
			</Container>
		</PayPalScriptProvider>
	);
}

export default ReviewBookingPage;

ReviewBookingPage.Layout = BookingLayout;
