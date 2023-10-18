import React from 'react';
import { ProfileLayout } from '~/components/layout';
import ProfileDesktop from './profile-desktop';
import ProfileMobile from './profile-mobile';

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
	return (
		<>
			<ProfileDesktop />
			<ProfileMobile />
		</>
	);
}

ProfilePage.Layout = ProfileLayout;
