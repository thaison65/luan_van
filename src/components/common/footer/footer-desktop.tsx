import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export interface FooterDesktopProps {}

function FooterDesktop({}: FooterDesktopProps) {
	return (
		<Box
			display={{ xs: 'none', md: 'block' }}
			paddingY={4}
		>
			<Container>
				<Typography>
					Mọi nội dung tại đây &copy; Được thực hiện bởi Đặng Thái Sơn - DH51904373
				</Typography>
			</Container>
		</Box>
	);
}

export default FooterDesktop;
