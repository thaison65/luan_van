import Link from 'next/link';
import { Stack, SvgIconTypeMap, Typography, SvgIcon } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type LinkUserProps = {
	href: string;
	title: string;
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

function LinkUser({ href, title, Icon }: LinkUserProps) {
	console.log(Icon);
	return (
		<Link
			href={href}
			style={{ textDecoration: 'none' }}
		>
			<Stack
				direction={'row'}
				spacing={1}
				p={1}
				sx={{ color: 'GrayText', ':hover': { color: 'ButtonText' } }}
			>
				<SvgIcon
					component={Icon}
					inheritViewBox
					color="inherit"
				/>
				<Typography>{title}</Typography>
			</Stack>
		</Link>
	);
}

export default LinkUser;
