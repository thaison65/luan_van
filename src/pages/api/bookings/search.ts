// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise(() => {
		// //convert cookies to header Authorizstion

		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		}); // Sau khi gọi API từ phía backend thì proxy cũng sẽ mã hóa luôn tới thẳng cho client

		proxy.once('proxyRes', () => {});
	});
}
