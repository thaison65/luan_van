import { GroupedRoom, ImageResult, RoomResult } from './hotel';

export interface ProductLoad {
	_id: string;
	id_hotel_management: string;
	id_hotelType: string;
	id_famousPlace: string;
	name: string;
	address: string;
	phone: string;
	number_star: string;
	rating: string;
	description: string;
	price: string;
	newImage: {};
	slug: string;
}

export interface CustomerResult {
	id_customer?: string;
	email: string;
	first_name: string;
	last_name: string;
	name_customer: string;
	phone_customer: string;
	phone: string;
	note: string;
	image?: ImageResult;
}

export interface HistoryResutl {
	booking: BookingResult;
	hotel: HotelResult;
	rooms: RoomResult[];
}

export interface HistoryResutl2 {
	booking: BookingResult;
	hotel: HotelResult;
	rooms: GroupedRoom[];
}

export interface BookingResult {
	_id: string;
	check_in_date: string;
	check_out_date: string;
	number_children: string[];
	number_adults: string;
	number_room: string;
	total_price: string;
	status: string;
}

export interface HotelResult {
	name: string;
	number_star: number;
	rating: number;
	phone: number;
	address: string;
	imgHotel?: ImageResult;
	regulations?: string;
}

export interface HotelResult1 {
	name: string;
	number_star: number;
	rating: number;
	imgHotel: ImageResult[];
	regulations?: string;
}
