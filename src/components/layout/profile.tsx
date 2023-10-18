import React from 'react';

import { Box, Stack, Container } from '@mui/material';

import { LayoutProps } from '~/models';
import { Footer, Header, SibarProfile } from '~/components/common';

interface ProfileLayoutProps {}

export function ProfileLayout({ children }: LayoutProps) {
	return (
		<Stack minHeight={'100vh'}>
			<Header />
			<Box
				bgcolor={'#F8F7F9'}
				component={'main'}
				flexGrow={1}
			>
				<Box>
					<Container>
						<Stack
							direction={'row'}
							spacing={4}
							justifyContent={'center'}
							mt={2}
						>
							<SibarProfile />
							{children}
						</Stack>
					</Container>
				</Box>
			</Box>

			<Footer />
		</Stack>
	);
}
