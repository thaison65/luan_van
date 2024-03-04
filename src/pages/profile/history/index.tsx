import { useEffect, useState } from 'react';
import { MainLayout } from '~/components/layout';
import HistoryDesktop from './history-desktop';
import { useAuth } from '~/hooks';
import { hotelApi } from '~/api-client';
import { HistoryResutl } from '~/models';

export interface HistoryProps {}

function HistoryPage({}: HistoryProps) {
	const { profile } = useAuth();

	const [posts, setPosts] = useState<HistoryResutl[]>([]);

	useEffect(() => {
		if (!profile) {
			return;
		}

		const getPost = async () => {
			try {
				const response = await hotelApi.getBooking(profile?.data._id);
				setPosts(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		getPost();
	}, [profile]);

	console.log(posts);

	return (
		<>
			<HistoryDesktop posts={posts} />
		</>
	);
}

export default HistoryPage;

HistoryPage.Layout = MainLayout;
