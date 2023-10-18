// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import { parse } from 'cookie';

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise(() => {
		// //convert cookies to header Authorizstion

		const cookie = req.headers.cookie;
		// Nếu cookie không tồn tại, trả về lỗi
		if (!cookie) {
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}

		const parsedCookie = parse(cookie);
		const session = parsedCookie['access_token']; // 'myapp-session' là tên cookie mà bạn đã đặt trong phần trước
		const accessToken = JSON.parse(session);
		if (accessToken) {
			req.headers.authorization = `Bearer ${accessToken}`;
		}

		// don't send cookies to API server
		req.headers.cookie = '';

		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		}); // Sau khi gọi API từ phía backend thì proxy cũng sẽ mã hóa luôn tới thẳng cho client

		proxy.once('proxyRes', () => {});
	});
}
