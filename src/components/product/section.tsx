import React from 'react';
import { Container, Box, Stack, Paper } from '@mui/material';

import { HotelListResult } from '~/models/hotel';
import PostListProduct from './post-list';

interface SectionProductProps {
	posts: HotelListResult[];
	number_adult: number;
	number_children: number;
	number_room: number;
}

function SectionProduct(props: SectionProductProps) {
	const { posts, number_adult, number_children, number_room } = props;
	return (
		<Container>
			<Stack
				marginTop={2}
				direction={'row'}
				justifyContent={'center'}
				spacing={2}
			>
				<>
					<PostListProduct
						postList={posts}
						number_adult={number_adult}
						number_children={number_children}
						number_room={number_room}
					/>
				</>
			</Stack>
		</Container>
	);
}

export default SectionProduct;
