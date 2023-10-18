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
	customer?: string;
	email: string;
	first_name: string;
	last_name: string;
	phone: string;
	note: string;
}
