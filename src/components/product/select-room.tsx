import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Divider, Paper, Typography, Stack, Button } from '@mui/material';
import { red } from '@mui/material/colors';

import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';

import { QuerySearchResult, RoomResult, RoomTypeState } from '~/models';
import { useRouter } from 'next/router';
import { convertToVND, theme } from '~/utils/index';

interface SelectRoomProps {
	rooms: RoomResult[];
	daily: number;
	nameHotel: string;
}

interface RoomType {
	[id: string]: RoomResult[];
}

function SelectRoom(props: SelectRoomProps) {
	const { daily, nameHotel, rooms } = props;

	const router = useRouter();

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

	const [querySearch, setQuerySearch] = useState<QuerySearchResult>();
	const [numberType, setNumberType] = useState<number>(0);
	const [roomsType, setRoomsType] = useState<RoomTypeState[]>([]);
	const [price, setPrice] = useState<number>(0);

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);
		setQuerySearch(querySearch);
	}, []);

	const handleClickBooking = async () => {
		if (roomsType.length === 0) {
			alert('Bạn chưa chọn phòng');
			return;
		}

		const roomBookings: RoomResult[] = [];
		roomsType.forEach((type) => {
			let number = type.number;

			if (number === 0) return;

			for (const room of rooms) {
				if (room.id_roomType._id === type.id) {
					roomBookings.push(room);
					number -= 1;

					if (number === 0) break;
				}
			}
		});

		localStorage.setItem('roomBookings', JSON.stringify(roomBookings));
		localStorage.setItem('nameHotel', JSON.stringify(nameHotel));
		localStorage.setItem('daily', JSON.stringify(daily));
		localStorage.setItem('imgRoom', JSON.stringify(roomBookings[0].img));
		localStorage.setItem('priceRoom', JSON.stringify(price * daily));

		router.push({ pathname: `/product/booking/booking`, query: {} });
	};

	const handlePlus = (id: string, numberRoom: number, priceRoom: number) => {
		const number_room = querySearch?.number_room;

		if (number_room === numberType) {
			alert('Đã quá số lượng phòng ban đầu');
			return;
		}

		const roomTypeExists = roomsType.find((room) => room.id === id);

		if (!roomTypeExists) {
			setNumberType((prevNumber) => prevNumber + 1);
			setPrice((prevPrice) => prevPrice + priceRoom);
			setRoomsType([...roomsType, { id, number: 1 }]);
		} else {
			const updatedRoomTypeIndex = roomsType.findIndex((type) => type.id === id);
			if (updatedRoomTypeIndex !== -1) {
				if (numberRoom < roomsType[updatedRoomTypeIndex].number + 1) {
					alert('Phòng này đã hết, xin chọn phòng khác');
					return;
				}
				roomsType[updatedRoomTypeIndex].number += 1;
				setRoomsType([...roomsType]);
				setNumberType((prevNumber) => prevNumber + 1);
				setPrice((prevPrice) => prevPrice + priceRoom);
			}
		}
	};

	const handleSub = (id: string, priceRoom: number) => {
		if (numberType === 0) {
			alert('Không còn cùng loại phòng để bạn trừ');
			return;
		}

		const roomTypeExists = roomsType.find((room) => room.id === id);

		if (!!roomTypeExists) {
			const updatedRoomTypeIndex = roomsType.findIndex((type) => type.id === id);

			if (updatedRoomTypeIndex !== -1) {
				if (roomsType[updatedRoomTypeIndex].number === 1) {
					// Delete the item if its number is already 1
					setRoomsType([
						...roomsType.slice(0, updatedRoomTypeIndex),
						...roomsType.slice(updatedRoomTypeIndex + 1),
					]);
					setNumberType((prevNumber) => prevNumber - 1);
					setPrice((prevPrice) => prevPrice - priceRoom);
				} else {
					// Decrement the number if it's greater than 1
					roomsType[updatedRoomTypeIndex].number -= 1;
					setRoomsType([...roomsType]);
					setNumberType((prevNumber) => prevNumber - 1);
					setPrice((prevPrice) => prevPrice - priceRoom);
				}
			}
		}
	};

	return (
		<Box
			marginTop={4}
			id="#phongnghi"
		>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
			>
				<Box>
					<Typography
						variant="h5"
						fontWeight={500}
					>
						Các lựa chọn khác
					</Typography>

					{numberType > 0 && (
						<Stack
							direction={'row'}
							spacing={1}
							marginTop={2}
						>
							<Typography
								color={'GrayText'}
								variant="h6"
							>
								Lựa chọn ban đầu:{' '}
							</Typography>
							{querySearch && (
								<Typography
									variant="h6"
									color={theme.palette.primary.main}
								>
									{querySearch.number_adults} người lớn, {querySearch.number_children?.length} trẻ
									em, {querySearch.number_room} phòng
								</Typography>
							)}
						</Stack>
					)}
				</Box>

				{numberType > 0 && (
					<Stack
						direction={'row'}
						alignItems={'end'}
					>
						<Stack
							justifyContent={'end'}
							spacing={1}
							margin={1}
						>
							<Typography variant="h6">Tổng tiền phòng mà bạn đã lựa chọn</Typography>
							<Stack
								direction={'row'}
								spacing={1}
								justifyContent={'space-between'}
							>
								<Typography
									fontWeight={600}
									color={theme.palette.primary.main}
									variant="h6"
								>
									{convertToVND(price * daily)}
								</Typography>
								<Typography variant="h6">Cho {daily} đêm</Typography>
							</Stack>
						</Stack>
						<Button
							variant="contained"
							color="warning"
							sx={{ mt: 2 }}
							onClick={() => handleClickBooking()}
						>
							Đặt phòng
						</Button>
					</Stack>
				)}
			</Stack>

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
							<Stack
								direction={'row'}
								component={Paper}
								alignItems={'center'}
								justifyContent={'center'}
								width={210}
								height={270}
							>
								<Image
									src={group.rooms[0].img.img_url}
									alt={group.rooms[0].img._id}
									width={200}
									height={250}
									loading="lazy"
								/>
							</Stack>

							<Box
								width={'75%'}
								maxHeight={600}
								paddingRight={2}
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
												{group.rooms[0].id_roomType.beds} giường đôi
											</Typography>
										</Box>
										<Box display={'flex'}>
											<PeopleIcon color="primary" />
											<Typography
												mx={1}
												fontWeight={400}
											>
												{group.rooms[0].id_roomType.capacity} khách
											</Typography>
										</Box>
									</Stack>

									<Divider sx={{ my: 2 }} />

									<Stack
										direction={'row'}
										justifyContent={'end'}
									>
										<Box>
											{roomsType.map((room) => {
												if (room.id === group.rooms[0].id_roomType._id) {
													return (
														<Stack
															key={room.id}
															direction={'row'}
															justifyContent={'end'}
															spacing={1}
															marginY={1}
														>
															<Typography>Số lượng phòng bạn đang chọn: </Typography>
															<Typography
																color={theme.palette.primary.main}
																fontWeight={600}
															>
																{room.number}
															</Typography>
														</Stack>
													);
												}
												return;
											})}
											<Stack
												direction={'row'}
												spacing={1}
												justifyContent={'end'}
											>
												<Button
													variant="contained"
													onClick={() =>
														handleSub(
															group.rooms[0].id_roomType._id,
															parseInt(group.rooms[0].price)
														)
													}
												>
													-
												</Button>
												<Button
													variant="contained"
													color="error"
													onClick={() =>
														handlePlus(
															group.rooms[0].id_roomType._id,
															group.rooms.length,
															parseInt(group.rooms[0].price)
														)
													}
												>
													+
												</Button>
											</Stack>
											<Typography
												textAlign={'end'}
												variant="h6"
												fontWeight={700}
												color={'orangered'}
											>
												{convertToVND(parseInt(group.rooms[0].price))}
											</Typography>
										</Box>
									</Stack>
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
