import React from 'react';
import { Box, Stack, Divider } from '@mui/material';

import PostProduct from './post';
import { HotelListResult } from '~/models/hotel';

export interface PostListProductProps {
	postList: HotelListResult[];
}

function PostListProduct({ postList }: PostListProductProps) {
	if (postList.length === 0) return null;

	return (
		<Stack
			spacing={2}
			paddingBottom={2}
		>
			{postList.map((post) => {
				return (
					<Box key={post._id}>
						<PostProduct valueHotel={post} />
						<Divider />
					</Box>
				);
			})}
		</Stack>
	);
}

export default PostListProduct;
