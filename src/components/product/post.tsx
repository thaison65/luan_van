import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Stack, Paper, Typography, Rating, Divider, Button } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PeopleIcon from '@mui/icons-material/People';
import BedIcon from '@mui/icons-material/Bed';

import { HotelListResult, RoomResult } from '~/models/hotel';
import { calculateTotalPrice, convertToVND, groupedRooms } from '~/utils/index';
import { theme } from '~/utils';
import { useAuth } from '~/hooks';
import { DialogAlertLogin } from '../components/dialog';

interface PostProductProps {
	valueHotel: HotelListResult;
	number_adult: number;
	number_children: number;
	number_room: number;
}

function PostProduct(props: PostProductProps) {
	const { valueHotel, number_adult, number_children, number_room } = props;

	const { profile } = useAuth();
	const router = useRouter();

	// Sử dụng hàm để tính toán totalPrice
	const totalPrice = calculateTotalPrice(valueHotel);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const image = valueHotel.img_url.img_url;
	const locations = valueHotel.id_tourists.map((location) => {
		return location.name;
	});

	console.log(profile);
	const handleClickDetail = (slug: string, id_hotel: string) => {
		if (profile === undefined) {
			handleClickOpen();
			return;
		}

		setTimeout(() => {
			router.push({
				pathname: `/product/${slug}`,
				query: {
					id: id_hotel,
				},
			});
		}, 500);
	};

	return (
		<Stack
			component={Paper}
			direction={'row'}
			justifyContent={'space-between'}
			padding={2}
		>
			<Stack
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Image
					src={image}
					alt={valueHotel.name}
					height={250}
					width={240}
				/>
			</Stack>
			<Box marginLeft={2}>
				<Typography
					variant="h5"
					fontWeight={500}
					color={theme.palette.primary.main}
				>
					{valueHotel.name} {valueHotel.name_short ? '(' + valueHotel.name_short + ')' : ''}
				</Typography>
				<Typography>{valueHotel.type}</Typography>
				<Rating
					name="half-rating"
					defaultValue={valueHotel.number_star}
					precision={0.5}
					readOnly
				/>

				<Typography
					my={1}
					fontWeight={500}
				>
					{valueHotel.address.length <= 50
						? valueHotel.address
						: `${valueHotel.address.slice(0, 50)} ...`}
				</Typography>
				<Typography>{valueHotel.famous}</Typography>
				<Typography
					maxWidth={250}
					variant="body2"
				>
					{valueHotel.description &&
						(valueHotel.description.length <= 50
							? valueHotel.description
							: `${valueHotel.description.slice(0, 50)} ...`)}
				</Typography>
				{valueHotel.id_tourists.length > 0 && (
					<Typography
						component={'span'}
						variant="body2"
						color={theme.palette.primary.main}
					>
						{locations.join(`, `).length <= 2 ? locations : `${locations.slice(0, 2)} ...`}
					</Typography>
				)}
				{groupedRooms(valueHotel.rooms).map((room) => (
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
			</Box>
			<Divider
				sx={{ mx: 2 }}
				orientation="vertical"
				flexItem
			/>
			<Stack
				justifyContent={'end'}
				marginLeft={2}
				textAlign={'end'}
			>
				<Typography variant="body2">
					{number_room} đêm, {number_adult} người lớn{' '}
					{number_children ? `, ${number_children} trẻ em` : ''}
				</Typography>
				<Typography
					variant="h6"
					fontWeight={700}
					color={'inherit'}
				>
					{convertToVND(totalPrice)}
				</Typography>
				<Button
					variant="outlined"
					endIcon={<NavigateNextIcon />}
					sx={{ marginY: 1 }}
					onClick={() => handleClickDetail(valueHotel.slug, valueHotel._id)}
				>
					Xem phòng đề xuất
				</Button>
			</Stack>
			<DialogAlertLogin
				open={open}
				handleClose={handleClose}
			/>
		</Stack>
	);
}

export default PostProduct;
