import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	Box,
	Stack,
	Paper,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';

import { ROUTE_LIST_IN_PROFILE } from '../routes';
import { useAuth } from '~/hooks';

import { ProfileUserLoad } from '~/models';
import { theme } from '~/utils';

interface SibarProfileProps {}

function SibarProfile({}: SibarProfileProps) {
	const { profile } = useAuth();
	const router = useRouter();

	const [profileUser, setProfileUser] = useState<ProfileUserLoad>(() => {
		return profile?.data;
	});

	useEffect(() => {
		if (profile) {
			setProfileUser(profile.data);
		}
	}, [profile]);

	return (
		<Box
			component={Paper}
			elevation={1}
			borderRadius={4}
			minWidth={300}
		>
			<Stack
				paddingY={2}
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				spacing={1}
			>
				<Typography
					variant="h6"
					component={'h5'}
					fontWeight={700}
					color={'#7f7f7f'}
				>
					Chủ tài khoản: {profileUser?.first_name + ' ' + profileUser?.last_name}
				</Typography>
			</Stack>
			<Divider />
			<List>
				{ROUTE_LIST_IN_PROFILE.map((value) => {
					return (
						<ListItem
							disablePadding
							key={value.lable}
						>
							<ListItemButton selected={router.pathname === value.path}>
								<ListItemIcon>
									<value.Icon sx={{ color: `${theme.palette.primary.main}` }} />
								</ListItemIcon>
								<Link
									href={value.path}
									style={{ textDecoration: 'none' }}
								>
									<ListItemText
										primary={value.lable}
										sx={{ color: `${theme.palette.primary.main}`, fontWeight: 400 }}
									/>
								</Link>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}

export default SibarProfile;
