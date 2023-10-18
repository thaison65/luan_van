import '~/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { Empty } from '~/components/layout';
import { AppPropsWithLayout } from '~/models';
import { SWRConfig } from 'swr';
import axiosClient from '~/api-client/axois-client';

import { theme, createEmotionCache } from '~/utils';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
	const Layout = Component.Layout ?? Empty;

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SWRConfig>
			</ThemeProvider>
		</CacheProvider>
	);
}
