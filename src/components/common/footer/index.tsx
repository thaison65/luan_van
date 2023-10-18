import React from 'react';
import Link from 'next/link';

import { Box } from '@mui/material';
import FooterDesktop from './footer-desktop';

export interface FooterProps {}

export default function Footer(props: FooterProps) {
	return (
		<>
			<Box
				component={'footer'}
				py={2}
				textAlign={'center'}
				bgcolor={'#1B1B1B'}
				color={'rgba(205,208,209,1.00)'}
			>
				<FooterDesktop />
			</Box>
		</>
	);
}
