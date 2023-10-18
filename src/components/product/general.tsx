import React from 'react';
import { Box, Typography, Rating, Divider, Stack, Paper, Button } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { HotelManagerResult } from '~/models/hotel';

interface GeneralProductDetailProps {
	name: string;
	address: string;
	number_star: string;
	description: string;
	id_hotel_management: HotelManagerResult;
}

function GeneralProductDetail({
	name,
	address,
	number_star,
	description,
	id_hotel_management,
}: GeneralProductDetailProps) {
	return (
		<Box id="#tongquan">
			<Stack
				direction={'row'}
				spacing={1}
			>
				<Box
					component={Paper}
					padding={2}
				>
					<Box
						display={'flex'}
						alignItems={'center'}
					>
						<Typography
							variant="h5"
							fontWeight={500}
						>
							{name}
						</Typography>
						<Rating
							sx={{ ml: 1 }}
							name="half-rating"
							defaultValue={parseInt(number_star)}
							precision={0.5}
							readOnly
						/>
					</Box>
					<Box display={'flex'}>
						<LocationOnIcon color="disabled" />
						<Typography color={'GrayText'}>{address}</Typography>
					</Box>
					<Divider />
					<Typography variant="body2">{description}</Typography>

					<Box marginTop={1}>
						<Typography variant="h6">Các tiện nghi được ưu thích</Typography>
					</Box>
				</Box>
				<Box minWidth={'40%'}>
					<Box
						component={Paper}
						padding={2}
					>
						<Typography fontWeight={400}>
							{id_hotel_management.first_name + ' ' + id_hotel_management.last_name}
						</Typography>
					</Box>
					<Box
						component={Paper}
						padding={2}
						marginTop={1}
					>
						<Typography fontWeight={500}>Điểm nổi bật của chỗ nghỉ</Typography>

						<Stack spacing={2}>
							<Box
								display={'flex'}
								justifyContent={'center'}
							>
								<Button
									variant="contained"
									sx={{ mt: 2, textAlign: 'center' }}
								>
									Đặt cho 3 người lớn, 1 trẻ em
								</Button>
							</Box>
							<Box
								display={'flex'}
								justifyContent={'center'}
							>
								<Button
									variant="outlined"
									startIcon={<FavoriteBorderIcon />}
								>
									Lưu vào mục yêu thích
								</Button>
							</Box>
						</Stack>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
}

export default GeneralProductDetail;
