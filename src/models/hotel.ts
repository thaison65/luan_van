export interface HotelListResult {
	_id: string;
	img_url: ImageResult;
	name: string;
	name_short: string;
	type: string;
	address: string;
	famous: string;
	number_star: number;
	rating: number;
	description: string;
	id_tourists: TouristReuslt[];
	rooms: RoomResult[];
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
	regulations: string;
	daily: number;
	description: string;
	images: ImageResult[];
	rooms: RoomResult[];
	id_tourists: TouristReuslt[];
}

export interface TouristReuslt {
	_id: string;
	name: string;
	img_url: string;
	id_place?: string;
}

export interface HotelManagerResult {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	slug: string;
}

export interface GroupedRoom {
	roomType: {
		_id: string;
		name: string;
		capacity: string;
		beds: string;
		description: string;
	};
	count: number;
}

export interface RoomResult {
	_id: string;
	name: string;
	id_roomType: {
		_id: string;
		name: string;
		capacity: string;
		beds: string;
		description: string;
	};
	price: string;
	phone: string;
	description: string;
	img: ImageResult;
	slug: string;
}

export interface RoomTypeState {
	id: string;
	number: number;
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
	_id: string;
	img_url: string;
}

// Định nghĩa kiểu cho đối tượng valueHotel
export interface ValueHotel {
	price: string;
	discount?: {
		discount_type: string;
		price_max: number;
		discount: number;
	};
}

export interface DataRoomResult {
	price: number;
	img: ImageResult;
	rooms: RoomResult[];
}
