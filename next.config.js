/** @type {import('next').NextConfig} */
const nextConfig = {
	// Bật chế độ nghiêm ngặt (strict mode) cho React trong quá trình phát triển.
	reactStrictMode: true,

	// Cấu hình xử lý hình ảnh trong Next.js.
	images: {
		// Các domain (hostname) được phép sử dụng trong thẻ <Image>.
		domains: ['images.unsplash.com', 'img.icons8.com', 'res.cloudinary.com', 'res.klook.com'],
	},
};

module.exports = nextConfig;
