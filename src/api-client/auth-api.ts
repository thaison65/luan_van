import { loginPayLoad, RegisterLoad, UpdateLoad, UpdatePwdUser } from '~/models';
import axiosClient from './axois-client';

export const authApi = {
	login(payload: loginPayLoad) {
		return axiosClient.post('customers/login', payload);
	},

	register(payload: RegisterLoad) {
		return axiosClient.post('customers/register', payload);
	},

	update(payload: UpdateLoad) {
		const id = payload._id;
		return axiosClient.put(`customers/update/${id}`, payload, {
			headers: {
				'Content-type': 'multipart/form-data',
			},
		});
	},

	updatePwd(payload: UpdatePwdUser) {
		const id = payload._id;
		return axiosClient.put(`customers/update/${id}/pwd`, payload);
	},

	logout() {
		return axiosClient.post('customers/logout');
	},

	getProfile() {
		return axiosClient.get('customers/profile');
	},
};
