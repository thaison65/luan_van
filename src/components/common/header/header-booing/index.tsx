import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography, Container } from '@mui/material';

import { BOOKING_LIST_STATUS } from './router';

interface HeaderBookingProps {}

function HeaderBooking({}: HeaderBookingProps) {
	return (
		<Box
			component={Container}
			display={'flex'}
			alignItems={'center'}
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
			<Stack
				padding={2}
				direction={'row'}
				spacing={8}
				flexGrow={0}
				justifyContent={'end'}
				alignItems={'center'}
			>
				{BOOKING_LIST_STATUS.map((status, index) => {
					return (
						<Box key={status.value}>
							<Typography
								fontWeight={400}
								color={'GrayText'}
								variant="body1"
							>
								{index + 1} {status.title}
							</Typography>
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}

export default HeaderBooking;
