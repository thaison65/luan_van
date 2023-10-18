import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '@mui/material';

export interface BankPageProps {}

function BankPage({}: BankPageProps) {
	const router = useRouter();

	const handleClick = () => {
		router.push('/');
	};
	return (
		<div>
			<Button onClick={handleClick}>Click</Button>
		</div>
	);
}

export default BankPage;
