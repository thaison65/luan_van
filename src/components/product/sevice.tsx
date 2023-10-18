import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface SeviceProductDetailProps {}

function SeviceProductDetail({}: SeviceProductDetailProps) {
	return (
		<Box marginY={4}>
			<Typography
				variant="h5"
				fontWeight={500}
			>
				Tiện ích chung
			</Typography>
		</Box>
	);
}

export default SeviceProductDetail;
