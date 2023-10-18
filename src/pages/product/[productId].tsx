import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container } from '@mui/material';

import { MainLayout } from '~/components/layout';
import HeroSectionProduct from '~/components/product/hero';
import ImageListProduct from '~/components/product/image-list';
import GeneralProductDetail from '~/components/product/general';
import SelectRoom from '~/components/product/select-room';
import SeviceProductDetail from '~/components/product/sevice';
import { hotelApi } from '~/api-client';
import { useRouter } from 'next/router';
import { HotelDetail } from '~/models/hotel';

interface ProductPageDetailProps {}

function ProductPageDetail({}: ProductPageDetailProps) {
	const router = useRouter();
	const [post, setPost] = useState<HotelDetail>();

	const query = router.query;

	useEffect(() => {
		const querySearch = JSON.parse(localStorage.getItem('querySearch') as string);

		const getHotel = async () => {
			try {
				if (!!query.id) {
					const response = await hotelApi.getHotelsID(
						query.id as string,
						querySearch.check_in_date as string,
						querySearch.check_out_date as string
					);
					setPost(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getHotel();
	}, [query.id]);

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<Box marginBottom={2}>
			<Head>
				<title>Trang đặt phòng của {post.name}</title>
			</Head>
			<HeroSectionProduct />
			<Container>
				<ImageListProduct itemData={post.images} />

				<Box marginTop={2}>
					<GeneralProductDetail
						name={post.name}
						number_star={post.number_star}
						address={post.address}
						description={post.description}
						id_hotel_management={post.id_hotel_management}
					/>
				</Box>

				<Box>
					<SelectRoom
						rooms={post.rooms}
						discount={post.discount}
						daily={post.daily}
						nameHotel={post.name}
					/>
				</Box>

				<Box>
					<SeviceProductDetail />
				</Box>
			</Container>
		</Box>
	);
}

export default ProductPageDetail;

ProductPageDetail.Layout = MainLayout;
