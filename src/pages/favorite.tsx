import React from 'react';
import { MainLayout } from '~/components/layout';
//import dynamic from 'next/dynamic';

//const Header = dynamic(() => import('~/components/common/header'), { ssr: false }); // đùng để chỉ load trên client không chạy trên server

export interface FavoritePageProps {}

export default function FavoritePage(props: FavoritePageProps) {
	return (
		<>
			Favorite Page
			{/* <Header /> */}
		</>
	);
}

FavoritePage.Layout = MainLayout;

// export async function getServerSideProps() {
// 	return {
// 		props: {}, //will be passed to the page component as props
// 	};
// }
