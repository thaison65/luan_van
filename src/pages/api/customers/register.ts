import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';

type Data = {
	message: string;
};

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'Method not supported!' });
	}

	return new Promise(() => {
		// don't send cookies to API server
		req.headers.cookie = '';

		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = '';
			proxyRes.on('data', function (chuck) {
				body += chuck;
			});

			proxyRes.on('end', function () {
				try {
					const statusCode = proxyRes && proxyRes.statusCode;
					if (statusCode && statusCode >= 400) {
						throw new Error();
					}
					(res as NextApiResponse).status(200).json({ message: 'Register successfully' });
				} catch (error) {
					(res as NextApiResponse).status(500).json({ message: 'Register not successfully' });
				}
			});
		};

		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		}); // Sau khi gọi API từ phía backend thì proxy cũng sẽ mã hóa luôn tới thẳng cho client

		proxy.once('proxyRes', handleLoginResponse);
	});
}
