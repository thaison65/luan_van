import React from 'react';
import { Container, Box, Stack, Paper } from '@mui/material';

import { RADIO_SORT } from './router';
import { HotelListResult } from '~/models/hotel';
import RadioPrice from '../components/raido/radio-price';
import PostListProduct from './post-list';

interface SectionProductProps {
	posts: HotelListResult[];
}

function SectionProduct({ posts }: SectionProductProps) {
	return (
		<Container>
			<Stack
				marginTop={2}
				direction={'row'}
				spacing={2}
			>
				<Box>
					<Box
						component={Paper}
						padding={4}
						borderRadius={2}
					>
						<RadioPrice
							title="Sắp xếp kết quả"
							label="Sắp xếp kết quả theo lựa chọn"
							valueRadio={RADIO_SORT}
						/>
					</Box>
				</Box>

				<Box>
					<PostListProduct postList={posts} />
				</Box>
			</Stack>
		</Container>
	);
}

export default SectionProduct;
