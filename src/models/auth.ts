import { ImageResult } from './hotel';

export interface loginPayLoad {
	phone: string;
	password: string;
}

export interface RegisterLoad {
	phone: string;
	password: string;
	email: string;
	first_name: string;
	last_name: string;
	gender: string;
	birthday: Date;
}

export interface UpdateLoad {
	_id: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	gender?: string;
	birthday?: Date;
	img_url?: File;
}

export interface UpdatePwdUser {
	_id: string;
	pwdOld: string;
	newPwd: string;
}

export interface ProfileUserLoad {
	_id: string;
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
	birthday: Date;
	gender: string;
	img_url: ImageResult;
}
