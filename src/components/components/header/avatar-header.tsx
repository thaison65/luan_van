import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Avatar, Typography, Menu, MenuItem, Box } from '@mui/material';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '~/hooks';

export interface AvatarHeaderProps {
	profile?: any;
	handleRenderLogout: () => void;
}

function AvatarHeader({ profile, handleRenderLogout }: AvatarHeaderProps) {
	const { logout } = useAuth();
	const router = useRouter();

	const [anchorElAvatar, setAnchorElAvatar] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorElAvatar);

	const handleClickAvatar = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorElAvatar(event.currentTarget);
	};
	const handleCloseAvatar = () => {
		setAnchorElAvatar(null);
	};

	const handleProfile = () => {
		router.push('/profile');
		handleCloseAvatar();
	};

	const handleListBookingOld = () => {
		handleCloseAvatar();
	};

	const handleClickLogout = async () => {
		await logout();
		handleRenderLogout();
		handleCloseAvatar();
	};

	return (
		<Box>
			<Button
				id="avatar-button"
				aria-controls={open ? 'avatar-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				size="small"
				onClick={handleClickAvatar}
			>
				<Avatar
					alt="anh dai dien"
					src={profile?.img_url}
					sx={{ mr: 1, width: 24, height: 24 }}
				/>
				<Typography
					variant="body2"
					color={'primary'}
				>{`${profile?.first_name} ${profile?.last_name}`}</Typography>
			</Button>
			<Menu
				id="avatar-menu"
				anchorEl={anchorElAvatar}
				open={open}
				onClose={handleCloseAvatar}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onClick={handleProfile}
					sx={{ p: 1 }}
				>
					<PersonOutlineIcon sx={{ color: '#7f7f7f', mx: 1 }} />
					<Link
						href={'/profile'}
						style={{ textDecoration: 'none' }}
					>
						<Typography
							sx={{ color: '#7f7f7f' }}
							variant="body2"
						>
							Quản lý tài khoản
						</Typography>
					</Link>
				</MenuItem>
				<MenuItem
					onClick={handleListBookingOld}
					sx={{ p: 1 }}
				>
					<WorkOutlineIcon sx={{ color: '#7f7f7f', mx: 1 }} />
					<Link
						href={'/profile/history'}
						style={{ textDecoration: 'none' }}
					>
						<Typography
							color={'#7f7f7f'}
							variant="body2"
						>
							Lịch sử đặt chỗ
						</Typography>
					</Link>
				</MenuItem>
				<MenuItem
					onClick={handleClickLogout}
					sx={{ p: 1 }}
				>
					<LogoutIcon sx={{ color: '#7f7f7f', mx: 1 }} />
					<Typography
						color={'#7f7f7f'}
						variant="body2"
					>
						Đăng xuất
					</Typography>
				</MenuItem>
			</Menu>
		</Box>
	);
}

export default AvatarHeader;
