import { CustomerDetails } from '~/components/swr';

export default function SWRPage() {
	return (
		<div>
			<h1>SWR Playground</h1>

			<ul>
				<li>
					<CustomerDetails customer_id={'647dea8750e09c3ef7653268'} />
				</li>
				<li>
					<CustomerDetails customer_id={'647dea8750e09c3ef7653268'} />
				</li>
			</ul>
		</div>
	);
}
