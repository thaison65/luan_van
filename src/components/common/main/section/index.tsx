import Image from 'next/image';
import { Typography, Box, Stack, Button } from '@mui/material';

import SectionImage from '~/images/photo-1440778303588-435521a205bc.webp';

interface SectionProps {
	handleClickBooking: () => void;
}

function Section(props: SectionProps) {
	const { handleClickBooking } = props;

	return (
		<Box marginBottom={2}>
			<Box paddingY={5}>
				<Typography
					variant="h6"
					color={'GrayText'}
					fontWeight={600}
				>
					Bạn dự định muốn đi đâu?
				</Typography>
				<Typography
					variant="h5"
					component={'h2'}
					color={'GrayText'}
					fontWeight={100}
				>
					KHÁCH SẠN, KHU NGHỈ DƯỠNG, CHỖ NGHỈ & HƠN THẾ NỮA
				</Typography>
			</Box>
			<Stack
				direction={'row'}
				minHeight={15}
			>
				<Stack
					justifyContent={'center'}
					width={350}
				>
					<Stack spacing={1}>
						<Typography color={'GrayText'}>Bạn muốn tìm phòng?</Typography>
						<Box>
							<Button
								variant="contained"
								sx={{ padding: '2' }}
								onClick={handleClickBooking}
							>
								Đặt phòng
							</Button>
						</Box>
					</Stack>
				</Stack>
				<Box sx={{ cursor: 'pointer' }}>
					<Image
						src={SectionImage}
						alt="photo"
						width={860}
						height={430}
						style={{ borderRadius: '40px' }}
						onClick={handleClickBooking}
					/>
				</Box>
			</Stack>
		</Box>
	);
}

export default Section;
