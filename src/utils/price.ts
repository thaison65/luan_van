import { ValueHotel } from '~/models';

export function calculateTotalPrice(valueHotel: ValueHotel): number {
	if (valueHotel.discount === undefined) {
		return parseInt(valueHotel.price);
	} else if (valueHotel.discount?.discount_type === 'fixed') {
		return parseInt(valueHotel.price) - valueHotel.discount?.price_max;
	} else {
		const discountedPrice = (valueHotel.discount?.discount * parseInt(valueHotel.price)) / 100;

		const totalPrice =
			discountedPrice < valueHotel.discount.price_max
				? discountedPrice
				: valueHotel.discount.price_max;

		return parseInt(valueHotel.price) - totalPrice;
	}
}

// Hàm tính toán giá trị discount
export function calculateDiscountText(valueHotel: ValueHotel): string {
	if (valueHotel.discount === undefined) {
		return 'Không có mã giảm';
	} else if (valueHotel.discount?.discount_type === 'fixed') {
		return 'Tiết kiệm ' + valueHotel.discount?.discount + ' đ';
	} else {
		return 'Tiết kiệm ' + valueHotel.discount?.discount + ' %';
	}
}

export const convertToVND = (price: number) => {
	const amount: number = price;
	const formattedAmount: string = amount.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
	return formattedAmount;
};
