export interface HotelListResult {
	_id: string;
	img_url: ImageResult;
	name: string;
	type: string;
	address: string;
	famous: string;
	number_star: number;
	rating: number;
	description: string;
	discount: DiscountReuilt;
	price: string;
	slug: string;
}

export interface HotelDetail {
	_id: string;
	id_hotel_management: HotelManagerResult;
	name: string;
	address: string;
	phone: string;
	number_star: string;
	rating: string;
	discount: DiscountReuilt;
	daily: number;
	description: string;
	images: ImageResult[];
	rooms: RoomResult[];
}

export interface HotelManagerResult {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	slug: string;
}

export interface RoomResult {
	_id: string;
	name: string;
	id_roomType: {
		_id: string;
		name: string;
		description: string;
	};
	price: string;
	phone: string;
	capacity: string;
	beds: string;
	description: string;
	slug: string;
}

export interface DiscountReuilt {
	_id: string;
	id_hotel: string;
	name: string;
	discount: number;
	discount_type: string;
	price_max: number;
	price_min: number;
	condition: string;
	description: string;
}

export interface ImageResult {
	contentType: string;
	data: {
		data: ArrayBufferLike;
	};
}
