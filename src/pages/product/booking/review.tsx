import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
	Box,
	Stack,
	Container,
	Paper,
	Button,
	Typography,
	Divider,
	Snackbar,
	Alert,
} from '@mui/material';

import { BookingLayout } from '~/components/layout';
import { QuerySearchResult, CustomerResult, RoomResult, ImageResult, GroupedRoom } from '~/models';
import { convertToVND, groupedRooms, handleDateConvertVN, theme } from '~/utils';

import { hotelApi } from '~/api-client';

interface ReviewBookingPageProps {}

interface PriceBooking {
	daily: number;
	price: number;
	priceSub: number;
	totalPrice: number;
}

function ReviewBookingPage({}: ReviewBookingPageProps) {
	const router = useRouter();

	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();
	const [dataCustomer, setDataCustomer] = useState<CustomerResult>();
	const [roomBookings, setRoomBookings] = useState<RoomResult[]>([]);
	const [groupRooms, setGroupRooms] = useState<GroupedRoom[]>([]);
	const [priceBooking, setPriceBooking] = useState<PriceBooking>();
	const [nameHotel, setNameHotel] = useState<string>();

	const [image, setImage] = useState<ImageResult>({ _id: '', img_url: '' });

	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') || 'null');
		const dataCustomer = JSON.parse(localStorage.getItem('dataCustomer') || 'null');
		const roomBookings = JSON.parse(localStorage.getItem('roomBookings') || 'null');
		const priceBooking = JSON.parse(localStorage.getItem('priceBooking') || 'null');
		const nameHotel = JSON.parse(localStorage.getItem('nameHotel') || 'null');

		if (querySearch === 'null' || dataCustomer === 'null' || roomBookings === 'null') {
			console.log('Có ít nhất một khóa không tồn tại hoặc có giá trị null');
			router.push('/');
			return;
		}

		const query = {
			...querySearch,
			check_in_date: new Date(querySearch?.check_in_date),
			check_out_date: new Date(querySearch?.check_out_date),
		};

		if (!!roomBookings) {
			const arrRooms: RoomResult[] = Object.values(roomBookings);

			setGroupRooms(groupedRooms(arrRooms));
		}

		setQuerySearch(query);
		setDataCustomer(dataCustomer);
		setRoomBookings(roomBookings);
		setGroupRooms(groupedRooms(roomBookings));
		setPriceBooking(priceBooking);
		setNameHotel(nameHotel);

		setImage(dataCustomer?.image);
	}, [querySearch, dataCustomer, roomBookings, priceBooking, nameHotel, router]);

	const handleGoBack = () => {
		router.back();
	};

	const handleClickBackForm = () => {
		router.push('/product/booking/booking');
	};

	const handleClickChangePlace = () => {
		// Xóa toàn bộ dữ liệu từ localStorage
		router.push('/');
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleClickCofirm = async () => {
		const check_in_date = querySearch?.check_in_date;
		const check_out_date = querySearch?.check_out_date;
		let id_rooms: string[] = [];
		roomBookings.map((room) => {
			id_rooms.push(room._id);
		});

		const data = {
			id_customer: dataCustomer?.id_customer,
			first_name: dataCustomer?.first_name,
			last_name: dataCustomer?.last_name,
			phone: dataCustomer?.phone,
			email: dataCustomer?.email,
			name_customer: dataCustomer?.name_customer,
			phone_customer: dataCustomer?.phone_customer,
			id_room: id_rooms,
			note: dataCustomer?.note,
			check_in_date: check_in_date,
			check_out_date: check_out_date,
			number_adults: querySearch?.number_adults,
			number_children: querySearch?.number_children,
			number_room: roomBookings.length,
			total_price: priceBooking?.totalPrice,
		};

		try {
			await hotelApi.booking(data);
			setOpenSnackbar(true);
			setTimeout(() => {
				router.push('/');
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Box
				paddingY={1}
				marginTop={2}
				onClick={handleGoBack}
				style={{ cursor: 'pointer' }}
			>
				<Typography>Quay lại trang trước</Typography>
			</Box>
			<Box>
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
						<Typography
							fontWeight={600}
							variant="h5"
							marginLeft={2}
							color={'GrayText'}
						>
							Thông tin khách sạn và phòng
						</Typography>
						<Stack
							margin={2}
							direction={'row'}
							spacing={2}
						>
							<Box>
								<Typography
									variant="h6"
									fontWeight={600}
								>
									<Typography
										component={'span'}
										fontWeight={300}
										variant="h6"
									>
										Tên chỗ cho thuê
									</Typography>{' '}
									{nameHotel}
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
								{groupRooms.map((room) => {
									return (
										<Box
											key={room.roomType._id}
											marginY={2}
										>
											<Stack
												direction={'row'}
												marginLeft={2}
											>
												<Typography>Phòng: </Typography>
												<Typography
													fontWeight={600}
													marginLeft={1}
												>
													{room.roomType.name} x{room.count}
												</Typography>
											</Stack>
											<Box marginX={2}>
												<Stack direction={'row'}>
													<Typography fontWeight={500}>số lượng khách/1 phòng: </Typography>
													<Typography
														ml={1}
														color={'GrayText'}
													>
														{room.roomType.capacity} khách
													</Typography>
												</Stack>
												<Stack direction={'row'}>
													<Typography fontWeight={500}>kiểu giường: </Typography>
													<Typography
														ml={1}
														color={'GrayText'}
													>
														{room.roomType.beds} giường đôi
													</Typography>
												</Stack>
											</Box>
										</Box>
									);
								})}
							</Box>

							<Box
								component={Paper}
								padding={1}
							>
								{image.img_url && (
									<Image
										src={image?.img_url}
										alt={image?._id}
										width={250}
										height={200}
									/>
								)}
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
										{groupRooms &&
											groupRooms.map((room) => {
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
									{priceBooking && (
										<Typography
											component={'span'}
											style={{ color: 'blue' }}
										>
											({priceBooking.daily} đêm)
										</Typography>
									)}
								</Stack>
								{priceBooking && (
									<Typography fontWeight={500}>{convertToVND(priceBooking.totalPrice)}</Typography>
								)}
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
							<Stack
								my={1}
								justifyContent={'end'}
								spacing={1}
							>
								<Stack
									direction={'row'}
									justifyContent={'end'}
									spacing={1}
								>
									<Button
										variant="contained"
										color={'primary'}
										onClick={handleClickChangePlace}
									>
										Thay đổi địa điểm
									</Button>
									<Button
										variant="contained"
										color={'success'}
										onClick={handleClickBackForm}
									>
										Điền lại thông tin
									</Button>
								</Stack>

								<Stack
									direction={'row'}
									justifyContent={'end'}
								>
									<Button
										variant="contained"
										color={'warning'}
										onClick={handleClickCofirm}
									>
										Xác nhận
									</Button>
								</Stack>
							</Stack>
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
							Chi tiết đơn về khách
						</Typography>
						<Divider />
						<Box margin={2}>
							{dataCustomer?.name_customer !== '' ? (
								<Stack direction={'row'}>
									<Typography color={'GrayText'}>Tên khách ở: </Typography>
									<Typography
										ml={1}
										fontWeight={500}
									>
										{dataCustomer?.name_customer}
									</Typography>
								</Stack>
							) : (
								<Stack direction={'row'}>
									<Typography color={'GrayText'}>Tên khách ở: </Typography>
									<Typography
										ml={1}
										fontWeight={500}
									>
										{dataCustomer?.first_name} {dataCustomer?.last_name}
									</Typography>
								</Stack>
							)}

							<Stack direction={'row'}>
								<Typography color={'GrayText'}>Số lượng: </Typography>
								<Typography
									fontWeight={500}
									ml={1}
								>
									{querySearch?.number_adults +
										' người lớn và ' +
										querySearch?.number_children?.length +
										' trẻ em'}
								</Typography>
							</Stack>
							<Stack direction={'row'}>
								<Typography color={'GrayText'}>Số lượng phòng thuê: </Typography>
								<Typography
									fontWeight={500}
									ml={1}
								>
									{roomBookings?.length} phòng
								</Typography>
							</Stack>

							<Stack direction={'row'}>
								<Typography color={'GrayText'}>Ghi chú: </Typography>
								<Typography
									fontWeight={500}
									ml={1}
								>
									{dataCustomer?.note ? dataCustomer.note : 'Không có ghi chú'}
								</Typography>
							</Stack>
						</Box>
					</Box>
				</Box>
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
						Đơn đặt phòng đã được đặt và chờ xác nhận
					</Alert>
				</Snackbar>
			</Stack>
		</Container>
	);
}

export default ReviewBookingPage;

ReviewBookingPage.Layout = BookingLayout;
