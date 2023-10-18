import React, { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Stack } from '@mui/material';
import { MainLayout } from '~/components/layout';
import HeroSectionProduct from '~/components/product/hero';
import SectionProduct from '~/components/product/section';
import { hotelApi } from '~/api-client';

interface ProductPageProps {}

export default function ProductPage({}: ProductPageProps) {
	const router = useRouter();

	const [posts, setPosts] = useState([]);

	const { id_place, check_in_date, check_out_date, number_adults, number_children, number_room } =
		router.query;

	const query = useMemo(() => {
		return {
			id_place: id_place as string,
			check_in_date: check_in_date as string,
			check_out_date: check_out_date as string,
			number_adults: number_adults as string,
			number_children: number_children as string[],
			number_room: number_room as string,
		};
	}, [id_place, check_in_date, check_out_date, number_adults, number_children, number_room]);

	const isQueryReady =
		query.id_place &&
		query.check_in_date &&
		query.check_out_date &&
		query.number_adults &&
		query.number_room;

	useEffect(() => {
		if (isQueryReady) {
			const getHotels = async () => {
				try {
					const response = await hotelApi.search(
						query.id_place,
						query.check_in_date,
						query.check_out_date,
						query.number_adults,
						query.number_children,
						query.number_room
					);
					const data = response.data;
					setPosts(data);
				} catch (error) {
					console.error(error);
					// Xử lý lỗi khi gọi API
				}
			};
			getHotels();
		}
	}, [query, isQueryReady]);

	return (
		<Box>
			<HeroSectionProduct />
			<Stack>
				<SectionProduct posts={posts} />
			</Stack>
		</Box>
	);
}

ProductPage.Layout = MainLayout;
