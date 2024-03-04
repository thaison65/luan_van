import { MainLayout } from '~/components/layout';
import HistoryDetailBookingDesktop from './history-detail-booking-desktop';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { hotelApi } from '~/api-client';
import { HistoryDetailResutl } from '~/models/other';

export interface HistoryDetailBookingPageProps {}

function HistoryDetailBookingPage({}: HistoryDetailBookingPageProps) {
	const router = useRouter();

	const query = router.query.hitoryId;

	const [post, setPost] = useState<HistoryDetailResutl>({});

	useEffect(() => {
		if (!!query) {
			const fetchData = async () => {
				try {
					const response = await hotelApi.getHistoryDetail(query as string);

					setPost(response.data);
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}
	}, [query]);

	return (
		<>
			<HistoryDetailBookingDesktop post={post} />
		</>
	);
}

export default HistoryDetailBookingPage;

HistoryDetailBookingPage.Layout = MainLayout;
