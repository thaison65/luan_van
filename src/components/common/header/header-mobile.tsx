import { Box, Stack, Typography, Button } from '@mui/material';

export interface HeaderMobileProps {}

function HeaderMobile({}: HeaderMobileProps) {
	return (
		<Box display={{ xs: 'flex', lg: 'none' }}>
			<Stack
				direction={'row'}
				margin={1}
				marginY={2}
			>
				<Box flexGrow={1}>
					<Typography
						fontWeight={600}
						variant="body1"
						color={'primary'}
					>
						Đặt phòng khách sạn
					</Typography>
				</Box>
				<Box flexGrow={0}></Box>
			</Stack>
		</Box>
	);
}

export default HeaderMobile;
