import { createContext, useState } from 'react';
import { Container, Box, Divider } from '@mui/material';

import Section from '~/components/common/main/section';
import Article from '~/components/common/main/article';

interface HeroSectionProps {}

interface InputContextProps {
	inputFocus: boolean;
}

export const InputContext = createContext<InputContextProps | null>(null);

function HeroSection(props: HeroSectionProps) {
	const {} = props;

	const [inputFocus, setInputFocus] = useState(false);

	const handleClickBooking = () => {
		setInputFocus(true);
	};

	return (
		<InputContext.Provider value={{ inputFocus }}>
			<Container>
				<Box pb={4}>
					<Section handleClickBooking={handleClickBooking} />
				</Box>
				<Divider />
				<Box py={4}>
					<Article />
				</Box>
			</Container>
		</InputContext.Provider>
	);
}
export default HeroSection;
