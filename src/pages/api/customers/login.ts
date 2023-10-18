// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import { serialize } from 'cookie';

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
					const token = JSON.parse(body);
					const { accessToken, expireAt } = token.data;

					//convert token in cookies
					const serializedCookie = serialize('access_token', JSON.stringify(accessToken), {
						httpOnly: true,
						secure: process.env.NODE_ENV !== 'development',
						maxAge: expireAt, // Thời gian phụ thuộc vào thời gian tồn tại của token
						sameSite: 'lax',
						path: '/',
					});

					res.setHeader('Set-Cookie', serializedCookie);

					(res as NextApiResponse).status(200).json({ message: 'Login successfully' });
				} catch (error) {
					(res as NextApiResponse).status(500).json({ message: 'something went wrong' });
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
