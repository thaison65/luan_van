import { MenuItem } from '@mui/material';

export const valueAges: JSX.Element[] = [];
for (let i = 1; i <= 12; i++) {
	valueAges.push(
		<MenuItem
			key={i}
			value={i}
		>
			{i} tuổi
		</MenuItem>
	);
}
