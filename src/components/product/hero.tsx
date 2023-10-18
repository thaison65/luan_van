import React, { useState, FormEvent } from 'react';
import { Box, Container, Stack, Paper, Button } from '@mui/material';
import SearchPlace from '../components/search/search-place';
import InputDate from '../components/input/input-date-in';
import FormQuality from '../components/input/form-quality';
import { FormQualityResult } from '~/models/search';

type HeroSectionProductProps = {};

function HeroSectionProduct({}: HeroSectionProductProps) {
	const [anchorElRoom, setAnchorElRoom] = useState<null | HTMLElement>(null);
	const [idSearch, setIdSearch] = useState('');
	const [inDate, setInDate] = useState<Date>(new Date());
	const [outDate, setOutDate] = useState<Date>(new Date());

	const [adult, setAdult] = useState<number>(1);
	const [arrayAge, setArrayAge] = useState<string[]>([]);
	const [room, setRoom] = useState<number>(1);

	const handleDataIDSearch = (childData: string) => {
		setIdSearch(childData);
	};
	const handleDataInDate = (date: Date) => {
		setInDate(date);
	};
	const handleDataOutDate = (date: Date) => {
		setOutDate(date);
	};
	const handleDataPeople = ({ adult, arrayAge, room }: FormQualityResult) => {
		setAdult(adult);
		setArrayAge(arrayAge);
		setRoom(room);
	};

	const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(idSearch);
	};

	return (
		<Box
			bgcolor={'primary.main'}
			component={'form'}
			method="GET"
			onSubmit={handleSubmitSearch}
		>
			<Container sx={{ padding: 2 }}>
				<Stack
					direction={'row'}
					spacing={2}
				>
					<SearchPlace onData={handleDataIDSearch} />
					<Box component={Paper}>
						<InputDate onDateIn={handleDataInDate} />
					</Box>
					<Box component={Paper}>
						<InputDate onDateIn={handleDataOutDate} />
					</Box>
					<Box component={Paper}>
						<FormQuality onData={handleDataPeople} />
					</Box>
					<Button
						variant="contained"
						sx={{ color: 'primary.main', bgcolor: '#ffffff', paddingX: 4 }}
						type="submit"
					>
						Tìm
					</Button>
				</Stack>
			</Container>
		</Box>
	);
}

export default HeroSectionProduct;
