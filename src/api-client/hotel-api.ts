import axiosClient from './axois-client';

export const hotelApi = {
	search(
		id_place: string,
		check_in_date: string,
		check_out_date: string,
		number_adults: string,
		number_children: string[] | undefined,
		number_room: string
	) {
		const params = {
			id_place: id_place,
			check_in_date: check_in_date,
			check_out_date: check_out_date,
			number_adults: number_adults,
			number_children: JSON.stringify(number_children),
			number_room: number_room,
		};

		return axiosClient.get(`bookings/search`, {
			params,
		});
	},

	getHotelsID(id: string, check_in_date: string, check_out_date: string) {
		const params = {
			check_in_date: check_in_date,
			check_out_date: check_out_date,
		};
		return axiosClient.get(`bookings/hotels/${id}`, { params });
	},

	booking(data: any) {
		return axiosClient.post(`bookings`, data);
	},

	confirm(data: any) {
		return axiosClient.post(`bookings/confirm`, data);
	},
};
