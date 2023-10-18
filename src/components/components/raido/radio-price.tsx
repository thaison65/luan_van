import React from 'react';
import { Box, Typography, Divider, FormControl, RadioGroup, Radio } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import { RadioSortResult } from '~/models';

interface RadioPriceProps {
	title: string;
	label: string;
	valueRadio: RadioSortResult[];
}

function RadioPrice({ title, label, valueRadio }: RadioPriceProps) {
	return (
		<Box>
			<Typography
				variant="h6"
				fontWeight={500}
			>
				{title}
			</Typography>
			<Typography color={''}>{label}</Typography>
			<Divider sx={{ marginY: 2 }} />
			<FormControl>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="popularity"
					name="radio-buttons-group"
				>
					{valueRadio.map((radio, index) => {
						return (
							<FormControlLabel
								key={index}
								value={radio.value}
								control={<Radio />}
								label={radio.label}
							/>
						);
					})}
				</RadioGroup>
			</FormControl>
		</Box>
	);
}

export default RadioPrice;
