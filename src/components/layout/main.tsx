import React from 'react';

import { Box, Stack, Container } from '@mui/material';

import { LayoutProps } from '~/models';
import { Header, Footer } from '~/components/common';

export interface MainLayoutProps {}

export function MainLayout({ children }: LayoutProps) {
	return (
		<Stack minHeight={'100vh'}>
			<Header />

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
