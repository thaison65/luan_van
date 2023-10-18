import { Box } from '@mui/material';

import { MainLayout } from '~/components/layout';
import { NextPageWithLayout } from '~/models';
import HeroSection from '~/components/common/home/hero';

const Home: NextPageWithLayout = () => {
	return (
		<Box>
			<HeroSection />
		</Box>
	);
};

Home.Layout = MainLayout;

export default Home;
