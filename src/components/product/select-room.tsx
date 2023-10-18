import React, { useEffect, useState } from 'react';
import { Box, Divider, Paper, Typography, Stack, Button } from '@mui/material';
import { red } from '@mui/material/colors';

import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { DiscountReuilt, QuerySearchResult, RoomResult } from '~/models';
import { useRouter } from 'next/router';
import { convertToVND, handleImage } from '~/utils/index';
import { theme } from '~/utils';

interface SelectRoomProps {
	rooms: RoomResult[];
	discount: DiscountReuilt;
	daily: number;
	nameHotel: string;
}

interface RoomType {
	[id: string]: RoomResult[];
}

function SelectRoom({ rooms, discount, daily, nameHotel }: SelectRoomProps) {
	const router = useRouter();

	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);
		setQuerySearch(querySearch);
	}, []);

	const groupedRooms: RoomType = rooms.reduce((result, room) => {
		const roomTypeId = room.id_roomType.name;
		if (!result[roomTypeId]) {
			result[roomTypeId] = [];
		}
		result[roomTypeId].push(room);
		return result;
	}, {} as RoomType);

	const groupedRoomsArray = Object.entries(groupedRooms).map(([key, value]) => ({
		name: key,
		rooms: value,
	}));

	const handleClickBooking = async (name: string) => {
		const number_room = querySearch?.number_room;
		let dataRooms: RoomResult[] = [];
		groupedRoomsArray.map((group) => {
			if (group.name === name) {
				dataRooms = group.rooms.slice(0, number_room);
				return;
			}
		});

		localStorage.setItem('roomBookings', JSON.stringify(dataRooms));
		localStorage.setItem('discount', JSON.stringify(discount));
		localStorage.setItem('nameHotel', JSON.stringify(nameHotel));
		localStorage.setItem('daily', JSON.stringify(daily));

		router.push({ pathname: `/product/booking`, query: {} });
	};

	return (
		<Box
			marginTop={4}
			id="#phongnghi"
		>
			<Typography
				variant="h5"
				fontWeight={500}
			>
				Phòng trống
			</Typography>
			<Divider sx={{ my: 2 }} />

			{groupedRoomsArray.map((group) => {
				return (
					<Box
						key={group.name}
						bgcolor={'#F2F3F3'}
						component={Paper}
						elevation={0}
						padding={2}
						marginY={2}
					>
						<Stack direction={'row'}>
							<Typography
								flexGrow={1}
								fontWeight={600}
								variant="h5"
								marginBottom={2}
								color={'GrayText'}
							>
								{group.name}
							</Typography>
							<Typography
								flexGrow={0}
								fontWeight={500}
								variant="body1"
								marginBottom={2}
								color={red[400]}
							>
								({group.rooms.length} phòng còn trống)
							</Typography>
						</Stack>

						<Stack
							direction={'row'}
							spacing={2}
						>
							<Box
								component={Paper}
								width={250}
								height={200}
							>
								<Typography>hình ảnh</Typography>
							</Box>

							<Box
								width={'75%'}
								maxHeight={600}
								paddingRight={2}
								sx={{ overflowY: rooms.length > 2 ? 'scroll' : undefined }}
							>
								<Box
									key={group.rooms[0]._id}
									component={Paper}
									marginBottom={1}
									padding={2}
								>
									<Typography
										variant="h6"
										fontWeight={500}
									>
										{group.name}
									</Typography>
									<Stack
										direction={'row'}
										spacing={2}
									>
										<Box display={'flex'}>
											<BedIcon color="primary" />
											<Typography
												mx={1}
												fontWeight={400}
											>
												{group.rooms[0].beds} giường đôi
											</Typography>
										</Box>
										<Box display={'flex'}>
											<PeopleIcon color="primary" />
											<Typography
												mx={1}
												fontWeight={400}
											>
												{group.rooms[0].capacity} khách
											</Typography>
										</Box>
									</Stack>

									<Divider sx={{ my: 2 }} />

									<Stack
										direction={'row'}
										spacing={1}
									>
										<Box>
											<Stack
												direction={'row'}
												spacing={1}
												flexGrow={1}
											>
												<Stack spacing={1}>
													<Box display={'flex'}>
														<RestaurantIcon color="success" />
														<Typography
															mx={1}
															fontWeight={400}
															color={'green'}
														>
															Bao gồm bữa sáng
														</Typography>
													</Box>
													<Box display={'flex'}>
														<WifiIcon color="success" />
														<Typography
															mx={1}
															fontWeight={400}
															color={'green'}
														>
															Wifi miễn phí
														</Typography>
													</Box>
												</Stack>
												<Stack spacing={1}>
													<Box display={'flex'}>
														<RequestPageIcon color="action" />
														<Typography
															mx={1}
															fontWeight={400}
															color={'gray'}
														>
															Hủy phòng có thu phí
														</Typography>
													</Box>
													<Box display={'flex'}>
														<VapingRoomsIcon color="action" />
														<Typography
															mx={1}
															fontWeight={400}
															color={'gray'}
														>
															Không hút thuốc
														</Typography>
													</Box>
												</Stack>
											</Stack>
											<Box
												display={'flex'}
												width={'80%'}
												alignItems={'center'}
											>
												<RoomServiceIcon
													color="primary"
													fontSize="large"
												/>
												<Typography
													color={theme.palette.primary.main}
													marginLeft={1}
												>
													Thanh toán khi nhận phòng Đặt bây giờ và thanh toán khi nhận phòng!
												</Typography>
											</Box>
										</Box>
										<Box
											flexGrow={0}
											justifyContent={'end'}
										>
											<Typography
												textAlign={'end'}
												variant="body2"
												height={24}
												fontWeight={500}
												color={'GrayText'}
												sx={{ textDecoration: 'line-through' }}
											>
												{discount ? convertToVND(parseInt(group.rooms[0].price) * daily) : ''}
											</Typography>
											<Typography
												textAlign={'end'}
												variant="h6"
												fontWeight={700}
												color={'orangered'}
											>
												{discount
													? convertToVND(
															discount.discount_type === 'percentage'
																? parseInt(group.rooms[0].price) * daily -
																		Math.min(
																			(discount.discount * parseInt(group.rooms[0].price) * daily) /
																				100,
																			discount.price_max
																		)
																: discount.discount_type === 'fixed'
																? parseInt(group.rooms[0].price) * daily - discount.price_max
																: parseInt(group.rooms[0].price)
													  )
													: convertToVND(parseInt(group.rooms[0].price) * daily)}
											</Typography>
											<Button
												variant="contained"
												color="warning"
												sx={{ mt: 2 }}
												onClick={() => handleClickBooking(group.name)}
											>
												Chọn phòng
											</Button>
										</Box>
									</Stack>
									<Divider sx={{ my: 2 }} />
									<Box display={'flex'}>
										<LocalOfferIcon color="success" />
										<Typography
											mx={1}
											color={'green'}
											fontWeight={600}
										>
											{discount
												? discount.discount_type === 'percentage'
													? `Tiết kiệm ${discount.discount} %`
													: `Tiết kiệm ${discount.discount} đ`
												: 'Không có giảm giá'}
										</Typography>
									</Box>
								</Box>
							</Box>
						</Stack>
					</Box>
				);
			})}
		</Box>
	);
}

export default SelectRoom;
