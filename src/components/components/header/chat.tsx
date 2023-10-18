import { useRouter } from 'next/router';
import { IconButton, Badge } from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';

type ChatProps = {
	number: number;
};

function Chat({ number }: ChatProps) {
	const router = useRouter();

	const handleClickChat = () => {
		router.push('/login');
	};

	return (
		<IconButton
			sx={{ pt: '0.5' }}
			onClick={handleClickChat}
		>
			<Badge
				badgeContent={number}
				color="error"
			>
				<ChatIcon color="primary" />
			</Badge>
		</IconButton>
	);
}

export default Chat;
