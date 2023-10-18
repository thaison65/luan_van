import { FormEvent, useMemo, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import InputSearchPlace from '~/components/components/search/input-search-place';
import InputDateIn from '~/components/components/input/input-date-in';
import FormQuality from '~/components/components/input/form-quality';

import { SelectChangeEvent } from '@mui/material/Select';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import { handleDateConvertVN, theme } from '~/utils';

import { FormQualityResult } from '~/models/search';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const options: JSX.Element[] = [];
for (let i = 1; i <= 10; i++) {
	options.push(
		<MenuItem
			key={i}
			value={i}
		>
			{i} đêm
		</MenuItem>
	);
}

type ContainerBookingProps = {};

const ContainerBooking = (props: ContainerBookingProps) => {
	const {} = props;
	const router = useRouter();

	const [adult, setAdult] = useState<number>(1);
	const [arrayAge, setArrayAge] = useState<string[]>([]);
	const [room, setRoom] = useState<number>(1);

	const nextDay = useMemo(() => {
		const currentDate = new Date();
		return new Date(currentDate.setDate(currentDate.getDate() + 1));
	}, []);

	const [checkoutdate, setCheckoutdate] = useState<Date>(new Date(nextDay));
	const [dateNumber, setDateNumber] = useState<string>('1');

	const [idSearch, setIdSearch] = useState('');
	const [inDate, setInDate] = useState<Date>(new Date());

	const handleDataIDSearch = (childData: string) => {
		setIdSearch(childData);
	};
	const handleDateInDate = (date: Date) => {
		setInDate(date);
	};
	const handleDataOutDate = (date: Date) => {
		setCheckoutdate(date);
	};
	const handleDataPeople = ({ adult, arrayAge, room }: FormQualityResult) => {
		setAdult(adult);
		setArrayAge(arrayAge);
		setRoom(room);
	};

	const handleChangeDateNumber = (event: SelectChangeEvent) => {
		const number = event.target.value as string;

		setDateNumber(number);

		const currentDate = new Date(inDate);
		const nextDay = new Date(currentDate.setDate(currentDate.getDate() + parseInt(number)));
		setCheckoutdate(nextDay);
	};

	const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const date_in = new Date(inDate);
		const date_out = new Date(checkoutdate);

		date_in.setHours(0, 0, 0, 0);
		date_out.setHours(0, 0, 0, 0);

		router.push({
			pathname: '/product',
			query: {
				id_place: idSearch,
				check_in_date: date_in.toString(),
				check_out_date: date_out.toString(),
				number_adults: adult,
				number_children: arrayAge,
				number_room: room,
			},
		});

		const querySearch = {
			id_place: idSearch,
			check_in_date: date_in.toString(),
			check_out_date: date_out.toString(),
			number_adults: adult,
			number_children: arrayAge,
			number_room: room,
		};
		localStorage.setItem('querySearch', JSON.stringify(querySearch));
	};

	return (
		<Box
			component={'form'}
			method="POST"
			onSubmit={handleSubmitSearch}
		>
			<Box
				borderRadius={4}
				position={'relative'}
				component={Paper}
				elevation={4}
				bgcolor={'#F8F7F9'}
				maxWidth={'50vw'}
				mx={'auto'}
				my={4}
			>
				<Box
					component={Paper}
					minHeight={50}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					maxWidth={'50%'}
					position={'absolute'}
					top={-25}
					right={0}
					left={0}
					marginX={'auto'}
				>
					<LocationOnIcon color="primary" />
					<Typography color={theme.palette.primary.main}>Địa điểm du lịch</Typography>
				</Box>
				<Stack
					paddingTop={2}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Stack
						spacing={1}
						paddingTop={4}
						paddingBottom={8}
					>
						<InputSearchPlace onData={handleDataIDSearch} />
						<Grid
							container
							spacing={2}
						>
							<Grid
								xs={12}
								md={6}
								item
								sx={{ marginLeft: '-16px' }}
							>
								<Item>
									<Typography
										fontWeight={500}
										textAlign={'start'}
										color={theme.palette.primary.main}
									>
										Ngày nhận phòng
									</Typography>
									<InputDateIn
										dateNumber={dateNumber}
										onDateOut={handleDataOutDate}
										onDateIn={handleDateInDate}
									/>
								</Item>
							</Grid>
							<Grid
								xs={12}
								md={6}
								item
							>
								<Item>
									<Typography
										fontWeight={500}
										textAlign={'start'}
										color={theme.palette.primary.main}
									>
										Số đêm nghỉ
									</Typography>
									<FormControl fullWidth>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={dateNumber}
											onChange={handleChangeDateNumber}
											sx={{ textAlign: 'start' }}
										>
											{options}
										</Select>
									</FormControl>
								</Item>
							</Grid>
						</Grid>
						<Grid
							container
							spacing={2}
						>
							<Grid
								xs={12}
								md={3}
								item
								sx={{ marginLeft: '-16px' }}
							>
								<Typography
									fontWeight={500}
									textAlign={'start'}
									color={theme.palette.primary.main}
								>
									Ngày trả phòng
								</Typography>
								<Typography
									textAlign={'start'}
									fontWeight={500}
								>
									{handleDateConvertVN(checkoutdate)}
								</Typography>
							</Grid>
							<Grid
								xs={12}
								md={9}
								item
							>
								<Item>
									<Typography
										fontWeight={500}
										textAlign={'start'}
										color={theme.palette.primary.main}
									>
										Khách và phòng
									</Typography>
									<FormQuality
										title={true}
										onData={handleDataPeople}
									/>
								</Item>
							</Grid>
						</Grid>
					</Stack>
				</Stack>
				<Button
					color="primary"
					sx={{
						borderRadius: 4,
						position: 'absolute',
						minHeight: 50,
						bottom: -25,
						right: 0,
						left: 0,
						mx: 'auto',
						maxWidth: '25vw',
					}}
					variant="contained"
					type="submit"
				>
					Tìm kiếm
				</Button>
			</Box>
		</Box>
	);
};

export default ContainerBooking;
