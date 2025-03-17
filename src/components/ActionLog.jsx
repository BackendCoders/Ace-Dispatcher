/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshedBookingsLog } from '../context/BookingLogSlice';

export default function ActionLog() {
	const dispatch = useDispatch();
	const { logsArray } = useSelector((state) => state.logs);

	useEffect(() => {
		dispatch(getRefreshedBookingsLog());
	}, [dispatch]);
	return (
		<div className='p-2'>
			{/* <div className='flex justify-between items-center mb-2 '>
				<h2 className='text-lg font-semibold'>Action Logs</h2>
			</div> */}
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white'>
					<thead className='bg-gray-200 text-gray-600'>
						<tr>
							<th className='py-3 px-4 text-left'>Date/Time</th>
							<th className='py-3 px-4 text-left'>Booking #</th>
							<th className='py-3 px-4 text-left'>User</th>
							<th className='py-3 px-4 text-left'>Action</th>
						</tr>
					</thead>
					<tbody>
						{logsArray?.length > 0 ? (
							logsArray.map((booking, index) => (
								<tr
									key={index}
									className={`hover:bg-gray-100 cursor-pointer`}
								>
									<td className='border px-4 py-2 whitespace-nowrap'>
										{new Date(booking?.timestamp)
											.toLocaleDateString('en-GB')
											?.split('T')[0] +
											' ' +
											booking?.timestamp?.split('T')[1]?.slice(0, 5)}
									</td>
									<td className='border px-4 py-2'>{booking?.bookingId}</td>
									<td className='border px-4 py-2'>{booking?.actionByUser}</td>
									<td className='border px-4 py-2'>{booking?.action}</td>
								</tr>
							))
						) : (
							<div className='flex justify-center items-center w-full'>
								No Data Found
							</div>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
