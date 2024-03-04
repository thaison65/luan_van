import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import BedIcon from '@mui/icons-material/Bed';

import { DataRoomResult, SearchQueryResult } from '~/models';
import { useRouter } from 'next/router';

import { hotelApi } from '~/api-client';
import { convertToVND, groupedRooms, handleDateConvertVN, theme } from '~/utils';

type RoomBookingProps = {
	querySearch?: SearchQueryResult;
	query: string;
	nameHotel: string;
	daily: number;
};

const RoomBooking = (props: RoomBookingProps) => {
	const { querySearch, query, nameHotel, daily } = props;

	const router = useRouter();

	const [postRooms, setPostRooms] = useState<DataRoomResult>();

	useEffect(() => {
		if (!!querySearch) {
			const getData = async () => {
				try {
					if (!!query) {
						const response = await hotelApi.getOneRoom(
							query as string,
							querySearch.check_in_date as string,
							querySearch.check_out_date as string,
							parseInt(querySearch.number_adults),
							parseInt(querySearch.number_room),
							querySearch.number_children as string[]
						);
						setPostRooms(response.data);
					}
				} catch (error) {
					console.log(error);
				}
			};
			getData();
		}
	}, [querySearch, query]);

	console.log(postRooms);

	const checkInDate = new Date(querySearch?.check_in_date as string);
	const checkOutDate = new Date(querySearch?.check_out_date as string);

	const handleClickBooking = () => {
		localStorage.setItem('roomBookings', JSON.stringify(postRooms?.rooms));
		localStorage.setItem('imgRoom', JSON.stringify(postRooms?.img));
		localStorage.setItem('priceRoom', JSON.stringify(postRooms?.price));

		localStorage.setItem('nameHotel', JSON.stringify(nameHotel));
		localStorage.setItem('daily', JSON.stringify(daily));

		router.push({ pathname: `/product/booking/booking`, query: {} });
	};

	return (
		<>
			<Typography
				marginY={2}
				variant="h5"
				fontWeight={500}
			>
				Phòng được đề xuất
			</Typography>
			<Box
				component={Paper}
				padding={2}
			>
				<Stack
					direction={'row'}
					spacing={2}
					justifyContent={'space-between'}
				>
					<Stack
						direction={'row'}
						spacing={2}
					>
						<Stack
							direction={'row'}
							component={Paper}
							padding={1}
							alignItems={'center'}
						>
							{postRooms && (
								<Image
									src={postRooms.img.img_url}
									alt=""
									width={200}
									height={250}
								/>
							)}
						</Stack>
						<Stack
							direction={'column'}
							justifyContent={'center'}
						>
							<Typography
								fontWeight={600}
								variant="body2"
								color={theme.palette.primary.main}
							>
								<Typography
									color={'GrayText'}
									component={'span'}
								>
									Tên loại phòng:{' '}
								</Typography>
								{postRooms?.rooms[0].id_roomType.name}
							</Typography>
							<Typography
								fontWeight={600}
								variant="body2"
								color={theme.palette.primary.main}
							>
								<Typography
									color={'GrayText'}
									component={'span'}
								>
									Phù hợp cho:{' '}
								</Typography>
								{querySearch?.number_adults + ' người lớn'}{' '}
								{querySearch?.number_children &&
									' và ' + querySearch?.number_children?.length + ' trẻ em'}
							</Typography>
							{postRooms?.rooms &&
								groupedRooms(postRooms.rooms).map((room) => (
									<Stack
										direction={'row'}
										key={room.roomType._id}
										spacing={1}
										alignItems={'start'}
									>
										<Typography>x{room.count}</Typography>

										<Box>
											<Typography fontWeight={600}>{room.roomType.name}</Typography>
											<Stack
												direction={'row'}
												spacing={1}
											>
												<BedIcon color="disabled" />
												<Typography
													variant="body2"
													fontWeight={100}
												>
													{room.roomType.beds} gường đôi
												</Typography>
											</Stack>
											<Stack
												direction={'row'}
												spacing={1}
											>
												<PeopleIcon color="disabled" />
												<Typography
													variant="body2"
													fontWeight={100}
												>
													{room.roomType.capacity} người
												</Typography>
											</Stack>
										</Box>
									</Stack>
								))}
						</Stack>
					</Stack>

					<Divider
						orientation="vertical"
						variant="middle"
						flexItem
					/>

					<Stack
						direction={'row'}
						alignItems={'end'}
						spacing={1}
					>
						<Stack alignItems={'end'}>
							<Box
								textAlign={'end'}
								marginY={2}
							>
								<Typography
									fontWeight={600}
									variant="body2"
								>
									<Typography
										color={'GrayText'}
										component={'span'}
									>
										Ngày nhận phòng:{' '}
									</Typography>
									{querySearch?.check_in_date && handleDateConvertVN(checkInDate)}
								</Typography>
								<Typography
									fontWeight={600}
									variant="body2"
								>
									<Typography
										color={'GrayText'}
										component={'span'}
									>
										Ngày nhận phòng:{' '}
									</Typography>
									{querySearch?.check_in_date && handleDateConvertVN(checkOutDate)}
								</Typography>
								<Typography
									fontWeight={600}
									variant="body2"
								>
									<Typography
										color={'GrayText'}
										component={'span'}
									>
										Số lượng phòng đặt ban đầu:{' '}
									</Typography>
									{querySearch?.number_room && querySearch.number_room} phòng
								</Typography>
							</Box>
							<Typography>
								Số lượng phòng đề xuất:{' '}
								<Typography
									component={'span'}
									fontWeight={600}
								>
									{postRooms?.rooms.length} phòng
								</Typography>
							</Typography>
							<Typography
								color={'red'}
								fontWeight={600}
								variant="h6"
							>
								<Typography
									color={'GrayText'}
									component={'span'}
								>
									Giá tiền:{' '}
								</Typography>
								{postRooms?.price && convertToVND(postRooms.price)}
							</Typography>
							<Button
								variant="contained"
								color="warning"
								onClick={handleClickBooking}
							>
								Đặt theo lựa chọn này
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</>
	);
};

export default RoomBooking;
