import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Container, Divider, Paper, Rating, Stack, Typography } from '@mui/material';

import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';

import { HistoryResutl, HistoryResutl2 } from '~/models';
import {
	handleDateConvertVN,
	theme,
	StatusBooking,
	StatusBookingConvertVN,
	groupedRooms,
} from '~/utils';

interface HistoryDesktopProps {
	posts: HistoryResutl[];
}

const HistoryDesktop = (props: HistoryDesktopProps) => {
	const { posts } = props;
	const router = useRouter();

	const [newPosts, setNewPosts] = useState<HistoryResutl2[]>();

	const handleClickDetailHistory = (id: string) => {
		router.push(`/profile/history/${id}`);
	};

	useEffect(() => {
		if (posts) {
			const newDatas = posts.map((post) => {
				const newRooms = groupedRooms(post.rooms);
				return { ...post, rooms: newRooms };
			});

			setNewPosts(newDatas);
		}
	}, [posts]);

	return (
		<Container>
			<Box margin={2}>
				<Typography
					fontWeight={600}
					variant="h4"
				>
					Lịch sử đặt phòng
				</Typography>
			</Box>
			{newPosts?.map((post) => {
				const checkInDate = new Date(post.booking.check_in_date);
				const checkOutDate = new Date(post.booking.check_out_date);
				return (
					<Box
						component={Paper}
						key={post.booking._id}
						padding={1}
						margin={2}
						onClick={() => handleClickDetailHistory(post.booking._id)}
						sx={{ ':hover': { cursor: 'pointer' } }}
					>
						<Stack
							direction={'row'}
							spacing={2}
							justifyContent={'space-between'}
						>
							<Stack
								direction={'row'}
								spacing={1}
							>
								{post.hotel.imgHotel && (
									<Image
										src={post.hotel.imgHotel.img_url}
										alt={post.hotel.imgHotel._id}
										width={150}
										height={150}
									/>
								)}
								<Box>
									<Stack
										direction={'row'}
										spacing={1}
										alignItems={'center'}
									>
										<Typography
											fontWeight={500}
											variant="h5"
										>
											{post.hotel.name}
										</Typography>
										<Box
											padding={1}
											bgcolor={theme.palette.primary.main}
										>
											<Typography
												fontWeight={500}
												color={'#fff'}
											>
												{post.hotel.rating}
											</Typography>
										</Box>
									</Stack>
									<Stack
										direction={'column'}
										spacing={1}
									>
										<Rating
											name="read-only"
											value={post.hotel.number_star}
											readOnly
										/>
										<Stack
											direction={'row'}
											spacing={1}
										>
											{/* <Image
												src={post.rooms[0].img.img_url}
												alt={post.rooms[0].img._id}
												width={75}
												height={75}
											/> */}
											{post.rooms.map((room) => {
												return (
													<Box key={room.roomType._id}>
														<Typography fontWeight={600}>
															x{room.count} {room.roomType.name}
														</Typography>
														<Stack
															direction={'row'}
															spacing={1}
														>
															<BedIcon />
															<Typography>{room.roomType.beds} gường</Typography>
														</Stack>
														<Stack
															direction={'row'}
															spacing={1}
														>
															<PeopleIcon />
															<Typography>{room.roomType.capacity} người</Typography>
														</Stack>
													</Box>
												);
											})}
										</Stack>
									</Stack>
								</Box>
							</Stack>
							<Divider
								sx={{ marginX: '1', bgcolor: 'GrayText', width: '1px' }}
								orientation={'horizontal'}
								light={true}
							/>
							<Box padding={2}>
								<Box textAlign={'end'}>
									<Typography
										color={StatusBooking(post.booking.status)}
										variant="h6"
									>
										{StatusBookingConvertVN(post.booking.status)}
									</Typography>
								</Box>
								<Stack
									direction={'row'}
									spacing={2}
								>
									<Typography
										component={'h6'}
										fontWeight={500}
									>
										Số lượng khách:
										<Typography
											component={'span'}
											color={'GrayText'}
										>
											{' '}
											{post.booking.number_adults} người
										</Typography>
									</Typography>
									<Typography
										component={'h6'}
										fontWeight={500}
									>
										Số lượng phòng:
										<Typography
											component={'span'}
											color={'GrayText'}
										>
											{' '}
											{post.booking.number_room} phòng
										</Typography>
									</Typography>
								</Stack>
								<Box>
									<Typography
										component={'h6'}
										fontWeight={500}
									>
										Ngày nhận phòng:
										<Typography
											component={'span'}
											color={'GrayText'}
										>
											{' '}
											{handleDateConvertVN(checkInDate)}
										</Typography>
									</Typography>
									<Typography
										component={'h6'}
										fontWeight={500}
									>
										Ngày trả phòng:
										<Typography
											component={'span'}
											color={'GrayText'}
										>
											{' '}
											{handleDateConvertVN(checkOutDate)}
										</Typography>
									</Typography>
								</Box>
								<Stack
									direction={'row'}
									alignItems={'center'}
									justifyContent={'space-between'}
								>
									<Typography
										component={'h6'}
										fontWeight={500}
									>
										Tổng tiền:
									</Typography>
									<Typography
										fontWeight={500}
										color={'red'}
										variant="h6"
									>
										{post.booking.total_price} vnđ
									</Typography>
								</Stack>
							</Box>
						</Stack>
					</Box>
				);
			})}
		</Container>
	);
};

export default HistoryDesktop;
