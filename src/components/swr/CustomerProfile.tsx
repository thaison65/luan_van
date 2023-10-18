import React from 'react';
import useSWR from 'swr';

export interface CustomerDetailsProps {
	customer_id: string;
}

const MILLISECOND_PED_HOUR = 60 * 60 * 1000;

export function CustomerDetails({ customer_id }: CustomerDetailsProps) {
	const { data, error, mutate, isValidating } = useSWR(`/customers/${customer_id}`, {
		revalidateOnFocus: false,
		dedupingInterval: MILLISECOND_PED_HOUR,
	});

	const handleMutateClick = () => {
		mutate({ name: 'hello' }, true);
	};

	return (
		<div>
			Tên: {data?.name || '--'}
			<button onClick={handleMutateClick}>mutate</button>
		</div>
	);
}
