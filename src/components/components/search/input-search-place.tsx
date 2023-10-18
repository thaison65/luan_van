import { ChangeEvent, useState, useRef, MouseEvent, useEffect, useContext } from 'react';
import axios from 'axios';
import {
	Typography,
	Box,
	Grid,
	Paper,
	FormControl,
	Input,
	InputAdornment,
	IconButton,
	MenuItem,
	Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

import { InputContext } from '~/components/common/home/hero';

import useDebounce from '~/hooks/use-debounce';
import { SearchResult } from '~/models/search';
import { theme } from '~/utils';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

type InputSearchPlaceProps = {
	onData: (data: string) => void;
};

function InputSearchPlace({ onData }: InputSearchPlaceProps) {
	const inputFocus = useContext(InputContext);

	const [clearText, setClearText] = useState(false);
	const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
	const [place, setPlace] = useState<string>('');

	const [anchorSearch, setAnchorSearch] = useState<boolean>(false);

	const debounce = useDebounce({ value: place, delay: 500 });

	const inputRef = useRef<HTMLInputElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseDown = (event: any | TouchEvent) => {
			if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
				setAnchorSearch(false);
			}
		};
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('touchstart', handleMouseDown);
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('touchstart', handleMouseDown);
		};
	}, []);

	const baseURL = 'http://localhost:3000/api/places/cities/search';

	useEffect(() => {
		if (!debounce.trim()) {
			setSearchResult([]);
			return;
		}

		try {
			const getPost = async () => {
				const { data: res } = await axios.get(`${baseURL}?searchString=${debounce}&size=3`);

				setSearchResult(res.data);
			};

			getPost();
		} catch (error) {
			console.log(error);
		}
	}, [debounce]);

	const handleClickClearText = () => {
		setClearText((show) => !show);
		setPlace('');
		onData('');
		inputRef.current?.focus();
	};

	const handleSetSearchID = (result: SearchResult) => {
		onData(result._id);
		setPlace(result.name);
		handleCloseSearch();
	};

	const handleCloseSearch = () => {
		setAnchorSearch(false);
	};

	const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleChangeInputPlace = (event: ChangeEvent<HTMLInputElement>) => {
		setPlace(event.target.value as string);
		setClearText(true);
		setAnchorSearch(true);
	};

	return (
		<Box>
			<Grid
				container
				marginLeft={0}
				marginTop={0}
			>
				<Grid
					xs={12}
					md={12}
					item
				>
					<Item
						sx={{
							textAlign: 'start',
						}}
					>
						<Typography
							component={'label'}
							fontWeight={500}
							color={theme.palette.primary.main}
							htmlFor="txt_place"
						>
							Thành phố, địa điểm
						</Typography>
						<Box
							display={'flex'}
							alignItems={'flex-end'}
						>
							<LocationOnIcon
								sx={{ color: 'primary.main', mr: 1, my: 0.5 }}
								fontSize="large"
							/>

							<FormControl
								sx={{ minWidth: '40vw', minHeight: 50, fontSize: 50 }}
								variant="standard"
							>
								<Input
									id="txt_place"
									name="place"
									value={place}
									ref={inputRef}
									spellCheck={false}
									placeholder="Nhập tên thành phố, địa điểm"
									onChange={handleChangeInputPlace}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												onClick={handleClickClearText}
												onMouseDown={handleMouseDown}
											>
												{clearText && place != '' ? <CloseIcon /> : null}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						</Box>
					</Item>
				</Grid>
			</Grid>
			<Box
				component={Paper}
				zIndex={10}
				position={'absolute'}
				ref={boxRef}
				display={`${anchorSearch ? 'block' : 'none'}`}
			>
				{searchResult.map((result) => {
					return (
						<MenuItem
							key={result._id}
							onClick={() => handleSetSearchID(result)}
							sx={{ mx: 1, minWidth: 500 }}
						>
							<Stack>
								<Box display={'flex'}>
									<LocationOnIcon color="primary" />
									<Typography
										fontWeight={500}
										marginLeft={1}
									>
										{result.name}
									</Typography>
								</Box>
								<Typography fontWeight={200}>{`${result.nameCity ? `${result.nameCity}, ` : ''}${
									result.area
								}`}</Typography>
							</Stack>
						</MenuItem>
					);
				})}
			</Box>
		</Box>
	);
}

export default InputSearchPlace;
