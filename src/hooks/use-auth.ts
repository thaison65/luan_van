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

import { loginPayLoad, RegisterLoad, UpdateLoad, UpdatePwdUser } from '~/models';

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

	const login = async ({ phone, password }: loginPayLoad) => {
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
	}: RegisterLoad) => {
		validatePhone(phone);
		validatePassword(password);
		validateEmail(email);
		validateFirstName(first_name);
		validateLastName(last_name);

		try {
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
		} catch (error) {
			throw new Error(error as string | undefined);
		}
	};

	const updateUser = async ({
		_id,
		email,
		first_name,
		last_name,
		gender,
		birthday,
		img_url,
	}: UpdateLoad) => {
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
		// Update local cache
		await mutate('/customers/profile');
	};

	const updatePwd = async ({ _id, pwdOld, newPwd }: UpdatePwdUser) => {
		pwdOld && validatePassword(pwdOld);
		newPwd && validatePassword(newPwd);

		await authApi.updatePwd({
			_id: _id,
			pwdOld: pwdOld,
			newPwd: newPwd,
		});
		// Update local cache
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
		updatePwd,
		logout,
		firstLoading,
	};
}
