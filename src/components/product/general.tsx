import Image from 'next/image';
import { Box, Typography, Rating, Divider, Stack, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { HotelManagerResult, TouristReuslt } from '~/models/hotel';

interface GeneralProductDetailProps {
	name: string;
	address: string;
	number_star: string;
	description: string;
	id_hotel_management: HotelManagerResult;
	numberAdults?: string;
	numberChildren?: string[];
	regulations: string;
	tourists: TouristReuslt[];
}

const GeneralProductDetail = (props: GeneralProductDetailProps) => {
	const {
		name,
		address,
		number_star,
		description,
		id_hotel_management,
		numberAdults,
		numberChildren,
		regulations,
		tourists,
	} = props;

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
				</Box>
				<Box minWidth={'40%'}>
					<Box
						component={Paper}
						padding={2}
					>
						<Stack direction={'row'}>
							<Typography
								fontWeight={400}
								display={'flex'}
							>
								Tên chủ khách sạn:{' '}
							</Typography>
							<Typography
								fontWeight={600}
								marginX={1}
							>
								{id_hotel_management.first_name + ' ' + id_hotel_management.last_name}
							</Typography>
						</Stack>

						<Stack direction={'row'}>
							<Typography
								fontWeight={400}
								display={'flex'}
							>
								Đặt phòng cho:{' '}
							</Typography>
							<Typography
								fontWeight={600}
								marginX={1}
							>
								{numberAdults + ' người lớn và ' + numberChildren?.length + ' trẻ em'}
							</Typography>
						</Stack>
					</Box>
					<Box
						component={Paper}
						padding={2}
						marginTop={1}
					>
						<Typography fontWeight={500}>Điểm nổi bật của chỗ nghỉ</Typography>
						<Stack
							direction={'row'}
							spacing={1}
						>
							<Typography color={'GrayText'}>Chính sách: </Typography>

							<Typography fontWeight={600}>{regulations}</Typography>
						</Stack>
					</Box>
				</Box>
			</Stack>

			<Box marginY={2}>
				<Typography
					fontWeight={600}
					variant="h6"
				>
					Các địa điểm gần kề
				</Typography>
				<Box
					component={Paper}
					padding={2}
				>
					<Stack
						direction={'row'}
						spacing={1}
					>
						{tourists.map((tourist) => {
							return (
								<Box key={tourist._id}>
									<Stack spacing={1}>
										<Typography fontWeight={600}>{tourist.name}</Typography>
										<Image
											src={tourist.img_url}
											alt={tourist.name}
											width={200}
											height={150}
										/>
									</Stack>
								</Box>
							);
						})}
					</Stack>
				</Box>
			</Box>
		</Box>
	);
};

export default GeneralProductDetail;
