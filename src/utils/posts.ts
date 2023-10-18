import { fromByteArray } from 'base64-js';
import { ImageResult } from '~/models/hotel';

export const handleImage = (images: ImageResult[]) => {
	let imagesSrc: string[] = [];

	images.map((img_url) => {
		if (img_url) {
			const contentType = img_url.contentType;
			const dataBuffer = new Uint8Array(img_url.data.data);
			const dataBase64 = fromByteArray(dataBuffer);
			const imageSrc = `data:${contentType};base64,${dataBase64}`;
			imagesSrc.push(imageSrc);
		}
	});
	return imagesSrc;
};

export const convertToVND = (price: number) => {
	const amount: number = price;
	const formattedAmount: string = amount.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
	return formattedAmount;
};
