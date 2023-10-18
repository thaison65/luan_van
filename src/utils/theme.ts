import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
export const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#CE93D8',
		},
		error: {
			main: red.A200,
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},

	components: {
		MuiContainer: {
			defaultProps: { maxWidth: 'lg' },
			styleOverrides: {
				maxWidthLg: {
					'@media (min-width: 900px)': {
						maxWidth: '1110px',
					},
				},
				maxWidthSm: {
					'@media (min-width: 680px)': {
						maxWidth: '600px',
					},
				},
			},
			variants: [],
		},
		MuiGrid: {
			defaultProps: {
				borderRadius: 4,
			},
		},
	},
});
