import { MouseEvent, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Stack, Typography } from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

interface NotificationProps {
	notifications: Notification[];
}

interface Notification {
	title: string;
	context: string;
}

const Notification = ({ notifications }: NotificationProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClickNotification = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseNotification = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				onClick={handleClickNotification}
				id="notification-button"
				aria-controls={open ? 'notification-menu' : undefined}
				aria-haspopup="true"
				size="small"
				aria-expanded={open ? 'true' : undefined}
			>
				<Badge
					badgeContent={notifications.length}
					color="primary"
				>
					<NotificationsNoneIcon color="warning" />
				</Badge>
			</IconButton>

			<Menu
				id="notification-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleCloseNotification}
				MenuListProps={{
					'aria-labelledby': 'notification-button',
				}}
			>
				{notifications.map((value) => {
					return (
						<MenuItem
							key={value.title}
							onClick={handleCloseNotification}
						>
							<Stack direction={'column'}>
								<Typography
									variant="body1"
									component={'h5'}
									fontWeight={500}
								>
									{value.title}
								</Typography>

								<Typography
									variant="body2"
									ml={1}
								>
									{value.context}
								</Typography>
							</Stack>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};

export default Notification;
