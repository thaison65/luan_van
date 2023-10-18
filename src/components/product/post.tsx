import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	Box,
	Stack,
	Paper,
	Typography,
	Rating,
	Divider,
	Button,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { red } from '@mui/material/colors';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { HotelListResult } from '~/models/hotel';
import { convertToVND, handleImage } from '~/utils/index';
import { theme } from '~/utils';
import { useAuth } from '~/hooks';

interface PostProductProps {
	valueHotel: HotelListResult;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function PostProduct({ valueHotel }: PostProductProps) {
	const { profile } = useAuth();
	const router = useRouter();

	const [totalPrice, setTotalPrice] = useState(() => {
		if (valueHotel.discount === undefined) {
			return parseInt(valueHotel.price);
		}
		if (valueHotel.discount?.discount_type === 'fixed') {
			return parseInt(valueHotel.price) - valueHotel.discount?.price_max;
		}
		return (
			parseInt(valueHotel.price) -
			((valueHotel.discount?.discount * parseInt(valueHotel.price)) / 100 <
			valueHotel.discount.price_max
				? (valueHotel.discount?.discount * parseInt(valueHotel.price)) / 100
				: valueHotel.discount.price_max)
		);
	});

	const [discount, setDiscount] = useState(() => {
		if (valueHotel.discount === undefined) {
			return 'Không có mã giảm';
		}
		if (valueHotel.discount?.discount_type === 'fixed') {
			return 'Tiết kiệm ' + valueHotel.discount?.discount + ' đ';
		}
		return 'Tiết kiệm ' + valueHotel.discount?.discount + ' %';
	});

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleGotoLogin = () => {
		setOpen(false);
		router.push({
			pathname: '/login',
		});
	};

	const images = handleImage([valueHotel.img_url]);
	const imageSrc = images[0];

	const handleClickDetail = (slug: string, id_hotel: string) => {
		if (!profile) {
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
			padding={2}
		>
			<Image
				src={imageSrc === '' ? '/a.jpg' : imageSrc}
				alt={valueHotel.name}
				height={200}
				width={200}
			/>
			<Box marginLeft={2}>
				<Typography
					variant="h5"
					fontWeight={500}
					color={theme.palette.primary.main}
				>
					{valueHotel.name}
				</Typography>
				<Typography>{valueHotel.type}</Typography>
				<Rating
					name="half-rating"
					defaultValue={valueHotel.number_star}
					precision={0.5}
					readOnly
				/>

				<Typography my={1}>{valueHotel.address}</Typography>
				<Typography>{valueHotel.famous}</Typography>
				<Typography
					maxWidth={250}
					variant="body2"
				>
					{valueHotel.description.length <= 50
						? valueHotel.description
						: `${valueHotel.description.slice(0, 50)} ...`}
				</Typography>
			</Box>
			<Divider
				sx={{ mx: 2 }}
				orientation="vertical"
				flexItem
			/>
			<Box marginLeft={2}>
				<Box textAlign={'end'}>
					<Checkbox
						{...label}
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite />}
					/>
				</Box>

				<Typography
					color={'#04A755'}
					fontWeight={500}
					variant="body2"
					my={1}
					textAlign={'end'}
				>
					{discount}
				</Typography>
				<Typography
					color={'#1BA0E8'}
					variant="body2"
					textAlign={'end'}
				>
					Thanh toán khi nhận phòng
				</Typography>
				<Typography
					pt={1}
					sx={{ textDecoration: 'line-through' }}
					textAlign={'end'}
					color={red[300]}
					height={24}
				>
					{valueHotel.discount ? convertToVND(parseInt(valueHotel.price)) : ' '}
				</Typography>
				<Typography
					variant="h6"
					fontWeight={700}
					textAlign={'end'}
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
					Xem phòng trống
				</Button>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Thông báo khi chưa đăng nhập tài khoản'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Bạn cần phải đăng nhập mới có thể xem thông tin về khách sạn
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
					>
						Đóng
					</Button>
					<Button
						onClick={handleGotoLogin}
						autoFocus
						color="error"
					>
						Đi tới trang đăng nhập
					</Button>
				</DialogActions>
			</Dialog>
		</Stack>
	);
}

export default PostProduct;
