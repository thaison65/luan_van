import useSWR from 'swr';
import { PublicConfiguration } from 'swr/_internal';
import { authApi } from '~/api-client';
import {
	validateBirthday,
	validateEmail,
	validateFirstName,
	validateLastName,
	validatePassword,
	validatePhone,
} from '~/utils/validation';

export interface UserCustomer {
	phone: string;
	password: string;
}

export interface RegisterCustomer extends UserCustomer {
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	birthday: Date;
}

export interface UpdateCustomer {
	_id: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	gender?: string;
	birthday?: Date;
	img_url?: File;
}

export function useAuth(option?: Partial<PublicConfiguration>) {
	const {
		data: profile,
		error,
		mutate,
	} = useSWR('/customers/profile', {
		dedupingInterval: 60 * 60 * 1000,
		revalidateOnFocus: false,
		...option,
	});

	const firstLoading = profile === undefined && error === undefined;

	const login = async ({ phone, password }: UserCustomer) => {
		validatePhone(phone);
		validatePassword(password);

		await authApi.login({ phone, password });
		await mutate();
	};

	const registerUser = async ({
		phone,
		password,
		email,
		first_name,
		last_name,
		gender,
		birthday,
	}: RegisterCustomer) => {
		validatePhone(phone);
		validatePassword(password);
		validateEmail(email);
		validateFirstName(first_name);
		validateLastName(last_name);
		// validateBirthday(birthday);

		await authApi.register({
			phone: phone,
			password: password,
			email: email,
			first_name: first_name,
			last_name: last_name,
			gender: gender,
			birthday: birthday,
		});
		await mutate({}, false);
	};

	const updateUser = async ({
		_id,
		email,
		first_name,
		last_name,
		gender,
		birthday,
		img_url,
	}: UpdateCustomer) => {
		email && validateEmail(email);
		first_name && validateFirstName(first_name);
		last_name && validateLastName(last_name);

		await authApi.update({
			_id: _id,
			email: email,
			first_name: first_name,
			last_name: last_name,
			gender: gender,
			birthday: birthday,
			img_url: img_url,
		});
		await mutate({}, false);
	};

	const logout = async () => {
		await authApi.logout();
		mutate({}, false);
	};

	return {
		profile,
		error,
		login,
		registerUser,
		updateUser,
		logout,
		firstLoading,
	};
}
