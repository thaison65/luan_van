import { useEffect, useState } from 'react';
import {
	Alert,
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	StatusBooking,
	StatusBookingConvertVN,
	groupedRooms,
	handleDateConvertVN,
	theme,
} from '~/utils';
import { HistoryDetailResutl } from '~/models/other';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import { DialogImage } from '~/components/components/dialog';
import { hotelApi } from '~/api-client';

type HistoryDetailBookingDesktopProps = {
	post: HistoryDetailResutl;
};

const HistoryDetailBookingDesktop = (props: HistoryDetailBookingDesktopProps) => {
	const { post } = props;
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [status, setStatus] = useState<string>('');
	const [img, setImg] = useState<string>('');

	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [titleAlert, setTitleAlert] = useState<string>('');

	useEffect(() => {
		if (post.booking) {
			setStatus(post.booking.status);
		}
	}, [post]);

	let checkInDate = new Date();
	let checkOutDate = new Date();
	if (post.booking) {
		checkInDate = new Date(post.booking.check_in_date);
		checkOutDate = new Date(post.booking.check_out_date);
	}

	const handleGoBack = () => {
		router.back();
	};

	const handleCLickZoom = (img_url: string) => {
		setOpen(true);
		setImg(img_url);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickDel = async () => {
		const id = post.booking?._id;

		try {
			if (!id) {
				return;
			}

			const data = {
				status: 'Cancelled',
			};

			await hotelApi.changeStatusBooking(id, data);
			setOpenAlert(true);
			setTitleAlert('Hủy phòng thành công');
			setStatus('Cancelled');
		} catch (error) {
			setOpenAlert(true);
			setTitleAlert('Hủy phòng không thành công');
		}
	};

	const handleCloseAlert = () => {
		setOpenAlert(false);
		setTitleAlert('');
	};
	return (
		<Container>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert
					onClose={handleCloseAlert}
					severity={titleAlert.includes('không') ? 'error' : 'success'}
					variant="filled"
					sx={{ width: '100%' }}
				>
					{titleAlert}
				</Alert>
			</Snackbar>
			<Stack
				paddingY={1}
				marginTop={2}
				onClick={handleGoBack}
				style={{ cursor: 'pointer' }}
				direction={'row'}
				alignItems={'end'}
			>
				<ArrowBackIcon color="disabled" />
				<Typography
					color={'GrayText'}
					fontWeight={100}
				>
					Quay lại trang trước
				</Typography>
			</Stack>

			<Stack
				direction={'row'}
				spacing={2}
				marginY={2}
				justifyContent={'center'}
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
							<Stack
								direction={'row'}
								spacing={2}
								alignItems={'end'}
							>
								<Box>
									<Typography
										variant="h6"
										fontWeight={600}
									>
										{post.hotel?.name}
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
												{handleDateConvertVN(checkInDate as Date)}
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
												{handleDateConvertVN(checkOutDate as Date)}
											</Typography>
										</Stack>
									</Box>
								</Box>
								<Stack direction={'row'}>
									{post.hotel?.imgHotel && (
										<Image
											key={post.hotel?.imgHotel?._id}
											src={post.hotel?.imgHotel?.img_url}
											alt={post.hotel?.imgHotel?._id}
											width={100}
											height={100}
											onClick={() => handleCLickZoom(post.hotel?.imgHotel?.img_url as string)}
										/>
									)}
								</Stack>
								<DialogImage
									handleClose={handleClose}
									img={img}
									title="Ảnh khách sạn"
									open={open}
									key={img}
								/>
							</Stack>
						</Stack>
						<Box
							marginBottom={2}
							marginLeft={2}
						>
							<Stack
								direction={'row'}
								spacing={1}
							>
								<PhoneIcon color="primary" />
								<Typography>{post.hotel?.phone}</Typography>
							</Stack>
							<Stack
								direction={'row'}
								spacing={1}
							>
								<LocationOnIcon color="primary" />
								<Typography>{post.hotel?.address}</Typography>
							</Stack>
						</Box>

						<Divider />

						<Stack
							direction={'row'}
							spacing={2}
							justifyContent={'space-between'}
						>
							<Stack
								direction={'row'}
								spacing={2}
							>
								{post.rooms &&
									groupedRooms(post.rooms).map((room) => {
										return (
											<Box key={room.roomType._id}>
												<Typography fontWeight={600}>
													x{room.count} {room.roomType.name}
												</Typography>
												<Stack
													direction={'row'}
													spacing={1}
												>
													<BedIcon color="primary" />
													<Typography>{room.roomType.beds} gường</Typography>
												</Stack>
												<Stack
													direction={'row'}
													spacing={1}
												>
													<PeopleIcon color="primary" />
													<Typography>{room.roomType.capacity} người</Typography>
												</Stack>
											</Box>
										);
									})}
							</Stack>
							<Divider orientation="vertical" />
							<Box>
								<Typography
									color={theme.palette.primary.main}
									fontWeight={600}
								>
									<Typography
										color={'GrayText'}
										component={'span'}
									>
										Số phòng thuê:
									</Typography>{' '}
									{post.rooms?.length} phòng
								</Typography>
								<Typography
									color={theme.palette.primary.main}
									fontWeight={600}
								>
									{post.booking?.number_adults} người lớn và {post.booking?.number_children} trẻ em
								</Typography>
								{post.booking && (
									<Typography
										color={StatusBooking(status)}
										fontWeight={600}
									>
										<Typography
											component={'span'}
											color={'GrayText'}
										>
											Trạng Thái:
										</Typography>{' '}
										{StatusBookingConvertVN(status)}
									</Typography>
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
						<Typography>{post.hotel?.regulations}</Typography>
					</Box>

					<Box>
						<Typography
							variant="h6"
							fontWeight={500}
							marginTop={4}
						>
							Giá tiền phải trả
						</Typography>

						<Box
							component={Paper}
							padding={2}
							marginTop={2}
						>
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
								<Typography fontWeight={600}>{post?.booking?.total_price} VND</Typography>
							</Stack>
						</Box>
					</Box>

					<Box
						display={'flex'}
						justifyContent={'end'}
						marginY={2}
					>
						{status === 'PendingConfirmation' ? (
							<Button
								variant="contained"
								color="warning"
								onClick={handleClickDel}
							>
								Hủy đặt phòng
							</Button>
						) : (
							''
						)}
					</Box>
				</Box>
			</Stack>
		</Container>
	);
};

export default HistoryDetailBookingDesktop;
