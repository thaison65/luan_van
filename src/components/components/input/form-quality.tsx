import { useState, MouseEvent } from 'react';
import {
	Box,
	Stack,
	Button,
	Menu,
	MenuItem,
	ButtonGroup,
	ListItemText,
	Typography,
	Grid,
	Select,
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material/Select';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PeopleIcon from '@mui/icons-material/People';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

import { FormQualityResult } from '~/models/search';
import { valueAges } from '~/hooks/value-ages';

interface FormQualityProps {
	title?: boolean;
	onData: ({ adult, arrayAge, room }: FormQualityResult) => void;
}

function FormQuality({ title = false, onData }: FormQualityProps) {
	const [adult, setAdult] = useState<number>(1);
	const [child, setChild] = useState<number>(0);
	const [arrayAge, setArrayAge] = useState<string[]>([]);
	const [room, setRoom] = useState<number>(1);

	const [anchorElRoom, setAnchorElRoom] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorElRoom);

	const handleClickSubAdult = () => {
		if (adult <= 1) {
			return;
		}
		setAdult(adult - 1);
	};
	const handleClickSubChild = () => {
		if (child <= 0) {
			return;
		}
		setChild(child - 1);
		setArrayAge(arrayAge.slice(0, -1));
	};
	const handleChangeAge = (event: SelectChangeEvent, index: number) => {
		const value = event.target.value as string;

		const newArrayAge = [...arrayAge];
		newArrayAge[index] = value;
		setArrayAge(newArrayAge);
	};
	const handleClickAddChild = () => {
		setChild(child + 1);
		setArrayAge([...arrayAge, '0']);
	};
	const handleClickSubRoom = () => {
		if (room <= 1) {
			return;
		}
		setRoom(room - 1);
	};

	const handleClickRoom = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorElRoom(event.currentTarget);
	};
	const handleCloseRoom = () => {
		setAnchorElRoom(null);
		onData({ adult, arrayAge, room });
	};

	return (
		<Box>
			<Stack
				fullWidth
				sx={{ cursor: 'pointer' }}
				border={1}
				borderColor={'#7f7f7f'}
				borderRadius={1}
				component={Button}
				color={'#7f7f7f'}
				alignItems={'start'}
				id="room-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClickRoom}
			>
				<Stack
					direction={'row'}
					padding={1}
					justifyContent={'space-between'}
				>
					<PersonAddAlt1Icon />
					<Typography
						flexGrow={1}
						textAlign={'start'}
						ml={1}
					>
						{title && `${adult} người lớn, ${child} trẻ em, ${room} phòng`}
					</Typography>
					<ArrowDropDownIcon sx={{ alignItems: 'end', flexGrow: 0 }} />
				</Stack>
			</Stack>
			<Menu
				id="room-menu"
				anchorEl={anchorElRoom}
				open={open}
				onClose={handleCloseRoom}
				MenuListProps={{
					'aria-labelledby': 'room-button',
				}}
			>
				<ListItemText>
					<Stack
						direction={'row'}
						alignItems={'center'}
						padding={1}
						minWidth={'32vw'}
					>
						<PeopleIcon sx={{ color: '#7f7f7f', margin: 1 }} />
						<Typography
							flexGrow={1}
							fontWeight={500}
						>
							Người lớn
						</Typography>
						<ButtonGroup
							variant="contained"
							aria-label="outlined primary button group"
						>
							<Button onClick={handleClickSubAdult}>-</Button>
							<Button
								variant="text"
								disabled
							>
								{adult}
							</Button>
							<Button onClick={() => setAdult(adult + 1)}>+</Button>
						</ButtonGroup>
					</Stack>
				</ListItemText>
				<ListItemText>
					<Stack
						direction={'row'}
						alignItems={'center'}
						padding={1}
					>
						<ChildFriendlyIcon sx={{ color: '#7f7f7f', margin: 1 }} />
						<Typography
							flexGrow={1}
							fontWeight={500}
						>
							Trẻ em
						</Typography>
						<ButtonGroup
							variant="contained"
							aria-label="outlined primary button group"
						>
							<Button onClick={handleClickSubChild}>-</Button>
							<Button
								variant="text"
								disabled
							>
								{child}
							</Button>
							<Button onClick={handleClickAddChild}>+</Button>
						</ButtonGroup>
					</Stack>
				</ListItemText>
				<ListItemText>
					<Stack
						direction={'row'}
						alignItems={'center'}
						padding={1}
					>
						<MeetingRoomIcon sx={{ color: '#7f7f7f', margin: 1 }} />
						<Typography
							flexGrow={1}
							fontWeight={500}
						>
							Phòng
						</Typography>
						<ButtonGroup
							variant="contained"
							aria-label="outlined primary button group"
						>
							<Button onClick={handleClickSubRoom}>-</Button>
							<Button
								variant="text"
								disabled
							>
								{room}
							</Button>
							<Button onClick={() => setRoom(room + 1)}>+</Button>
						</ButtonGroup>
					</Stack>
				</ListItemText>
				<Stack
					direction={'row'}
					px={2}
					justifyContent={'flex-end'}
				>
					<Typography
						color={'GrayText'}
						fontWeight={100}
					>
						Trẻ em trên 12 tuổi được tính là người lớn!
					</Typography>
				</Stack>
				<ListItemText>
					<Grid
						container
						spacing={1}
						m={1}
					>
						{arrayAge.map((value, index) => {
							return (
								<Grid
									key={index}
									item
									xs={12}
									md={4}
								>
									<Typography textAlign={'start'}>Tuổi của trẻ thứ {index + 1}</Typography>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={arrayAge[index]}
										onChange={(event) => handleChangeAge(event, index)}
										sx={{ textAlign: 'start' }}
									>
										<MenuItem value={0}>{'< 1 tuổi'}</MenuItem>
										{valueAges}
									</Select>
								</Grid>
							);
						})}
					</Grid>
				</ListItemText>
			</Menu>
		</Box>
	);
}

export default FormQuality;
