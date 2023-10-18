import { PayPalButtons } from '@paypal/react-paypal-js';

export default function Payload() {
	const createOrder = (data: any, actions: any) => {
		// Order is created on the server and the order id is returned
		return fetch('/api/bookings/pay/create-paypal-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// use the "body" param to optionally pass additional order information
			// like product skus and quantities
			body: JSON.stringify({
				product: {
					description: 'Hoel',
					price: '500',
				},
			}),
		})
			.then((response) => response.json())
			.then((order) => order.id);
	};
	const onApprove = (data: any, actions: any) => {
		// Order is captured on the server and the response is returned to the browser
		return fetch('api/bookings/pay/capture-paypal-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				orderID: data.orderID,
			}),
		}).then((response) => response.json());
	};
	return (
		<PayPalButtons
			createOrder={(data: any, actions: any) => createOrder(data, actions)}
			onApprove={(data: any, actions: any) => onApprove(data, actions)}
		/>
	);
}
