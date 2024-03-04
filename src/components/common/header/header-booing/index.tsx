import React from 'react';
import Link from 'next/link';
import { Box, Typography, Container } from '@mui/material';

interface HeaderBookingProps {}

function HeaderBooking({}: HeaderBookingProps) {
	return (
		<Box
			component={Container}
			display={'flex'}
			alignItems={'center'}
			paddingY={2}
		>
			<Box flexGrow={1}>
				<Box
					flexGrow={1}
					display={'flex'}
					justifyContent={'start'}
					alignItems={'center'}
				>
					<Link
						href={'/'}
						style={{ textDecoration: 'none' }}
					>
						<Typography
							variant="h4"
							component={'h1'}
							color={'#7f7f7f'}
							textAlign={'center'}
						>
							Đặt phòng online
						</Typography>
					</Link>
				</Box>
			</Box>
		</Box>
	);
}

export default HeaderBooking;
