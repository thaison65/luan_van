import { MouseEvent, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import KeyIcon from '@mui/icons-material/Key';

import LinkUser from '../link/link-user';

interface HeaderProfileProps {}

const HeaderProfile = (props: HeaderProfileProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClickOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClickOpenMenu}
			>
				<PersonOutlineIcon />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<Box paddingX={2}>
					<MenuItem sx={{ p: 0 }}>
						<LinkUser
							href="/login"
							title="Đăng nhập"
							Icon={LoginIcon}
						/>
					</MenuItem>
					<MenuItem sx={{ p: 0 }}>
						<LinkUser
							href="/register"
							title="Đăng ký"
							Icon={KeyIcon}
						/>
					</MenuItem>
				</Box>
			</Menu>
		</>
	);
};

export default HeaderProfile;
