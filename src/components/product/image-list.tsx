import React from 'react';
import Image from 'next/image';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { ImageResult } from '~/models/hotel';
import { handleImage } from '~/utils';

export interface ImageListProductProps {
	itemData: ImageResult[];
}

export default function ImageListProduct({ itemData }: ImageListProductProps) {
	const images = handleImage(itemData);

	return (
		<Box sx={{ width: '100%', height: 300, overflowY: 'scroll' }}>
			<ImageList
				variant="masonry"
				cols={4}
				gap={8}
			>
				{images.map((item) => (
					<ImageListItem key={item}>
						<Image
							src={item}
							alt={item}
							width={248}
							height={168}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
}
