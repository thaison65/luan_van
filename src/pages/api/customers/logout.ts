import type { NextApiRequest, NextApiResponse } from 'next';
import httProxy from 'http-proxy';
import { serialize } from 'cookie';

type Data = {
	message: string;
};

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'method not supported' });
	}

	// Đặt giá trị của các thuộc tính của cookie về giá trị âm hoặc bằng 0
	const serializedCookie = serialize('access_token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		maxAge: -1,
		expires: new Date(0),
		sameSite: 'lax',
		path: '/',
	});

	// Đưa cookie mới này vào response header để xóa cookie cũ
	res.setHeader('Set-Cookie', serializedCookie);

	res.status(200).json({ message: 'Logout successfully' });
}
