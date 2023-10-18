import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';

import {
	Badge,
	Box,
	Button,
	IconButton,
	Stack,
	Typography,
	Menu,
	MenuItem,
	Avatar,
	Paper,
} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useRouter } from 'next/router';
import { useAuth } from '~/hooks';

import HeaderAvatar from '../../components/header/avatar-header';
import Logo from '~/components/components/title/logo';
import Notification from '~/components/components/header/notification';
import HeaderProfile from '~/components/components/header/header-profile';
import Chat from '~/components/components/header/chat';

const notifications = [
	{ title: 'Thông báo 1', context: 'Đây là nội dung của thông báo 1' },
	{ title: 'Thông báo 2', context: 'Đây là nội dung của thông báo 2' },
	{ title: 'Thông báo 3', context: 'Đây là nội dung của thông báo 3' },
	{ title: 'Thông báo 4', context: 'Đây là nội dung của thông báo 4' },
	{ title: 'Thông báo 5', context: 'Đây là nội dung của thông báo 5' },
];

export interface HeaderDesktopProps {}

function HeaderDesktop({}: HeaderDesktopProps) {
	const router = useRouter();
	const { profile } = useAuth();

	const handleClickFavorite = () => {
		router.push('/favorite');
	};

	return (
		<Box
			display={{ xs: 'none', lg: 'flex' }}
			component={Paper}
			elevation={1}
			paddingY={1}
		>
			<Box
				flexGrow={1}
				display={'flex'}
				marginLeft={2}
				alignItems={'center'}
			>
				<Logo />
			</Box>
			<Stack
				flexGrow={0}
				direction={'row'}
				justifyContent={'flex-end'}
				paddingBottom={1}
				spacing={1}
				mt={'1vh'}
				mr={1}
			>
				<Button
					color="primary"
					variant="text"
					size="small"
				>
					<Link
						href={'/'}
						prefetch={false}
						style={{ textDecoration: 'none' }}
					>
						<Typography color={'#1976d2'}>Đăng ký cho thuê chỗ nghỉ</Typography>
					</Link>
				</Button>

				{!profile ? (
					<HeaderProfile />
				) : (
					<Stack
						direction={'row'}
						spacing={1}
					>
						<Button
							onClick={handleClickFavorite}
							color="error"
							variant="text"
							size="small"
							startIcon={<FavoriteBorderIcon />}
						>
							Yêu thích
						</Button>

						<Notification notifications={notifications} />

						<Chat number={4} />

						<HeaderAvatar profile={profile.data} />
					</Stack>
				)}
			</Stack>
		</Box>
	);
}

export default HeaderDesktop;
