import React from 'react';
import { ProfileLayout } from '~/components/layout';
import PasswordDesktop from './password-desktop';
import PasswordMoblie from './password-mobile';

export interface PasswordProps {}

function PasswordPage({}: PasswordProps) {
	return (
		<>
			<PasswordDesktop />
			<PasswordMoblie />
		</>
	);
}

export default PasswordPage;

PasswordPage.Layout = ProfileLayout;
