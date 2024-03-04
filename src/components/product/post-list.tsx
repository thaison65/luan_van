import React from 'react';
import { Box, Stack, Divider } from '@mui/material';

import PostProduct from './post';
import { HotelListResult } from '~/models/hotel';

export interface PostListProductProps {
	postList: HotelListResult[];
	number_adult: number;
	number_children: number;
	number_room: number;
}

function PostListProduct(props: PostListProductProps) {
	const { postList, number_adult, number_children, number_room } = props;

	if (postList.length === 0) return null;

	return (
		<Stack
			spacing={2}
			paddingBottom={2}
		>
			{postList.map((post) => {
				return (
					<Box key={post._id}>
						<PostProduct
							valueHotel={post}
							number_adult={number_adult}
							number_children={number_children}
							number_room={number_room}
						/>
						<Divider />
					</Box>
				);
			})}
		</Stack>
	);
}

export default PostListProduct;
