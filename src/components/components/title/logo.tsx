import Link from 'next/link';
import { Typography } from '@mui/material';

interface LogoProps {}

function Logo({}: LogoProps) {
	return (
		<>
			<Link
				href={'/'}
				style={{ textDecoration: 'none' }}
			>
				<Typography
					variant="h5"
					color={'primary'}
					fontWeight={600}
				>
					Đặt phòng khách sạn
				</Typography>
			</Link>
		</>
	);
}

export default Logo;
