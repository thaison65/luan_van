import React from 'react';
import Image from 'next/image';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { ImageResult } from '~/models/hotel';

export interface ImageListProductProps {
	itemData: ImageResult[];
}

export default function ImageListProduct({ itemData }: ImageListProductProps) {
	const images = itemData;

	return (
		<Box sx={{ height: 250, overflowY: 'scroll' }}>
			<ImageList
				variant="standard"
				cols={3}
			>
				{images.map((item) => {
					return (
						<ImageListItem key={item._id}>
							<Image
								src={item.img_url}
								alt={item._id}
								width={350}
								height={300}
								loading="lazy"
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		</Box>
	);
}
