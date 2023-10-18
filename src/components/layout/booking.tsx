import React from 'react';

import { Box, Stack } from '@mui/material';

import { LayoutProps } from '~/models';
import { HeaderBooking, Footer } from '~/components/common';
0;
export interface BookingLayoutProps {}

export function BookingLayout({ children }: LayoutProps) {
	return (
		<Stack minHeight={'100vh'}>
			<HeaderBooking />

			<Box
				bgcolor={'#F8F7F9'}
				component={'main'}
				flexGrow={1}
			>
				{children}
			</Box>

			<Footer />
		</Stack>
	);
}
