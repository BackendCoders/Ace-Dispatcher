/** @format */

// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { getRefreshedBookingsLog } from '../context/BookingLogSlice';

export default function BookingsLog() {
	// const dispatch = useDispatch();
	const { createResponseArray } = useSelector((state) => state.bookingForm);

	console.log('logs---', createResponseArray);

	// useEffect(() => {
	// 	dispatch(getRefreshedBookingsLog());
	// }, [dispatch]);
	return (
		<div className='p-2'>
			<div className='flex justify-between items-center p-4'>
				<h2 className='text-lg font-semibold'>Bookings Log</h2>
			</div>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white'>
					<thead className='bg-gray-200 text-gray-600'>
						<tr>
							<th className='py-3 px-4 text-left'>Pickup Date/Time</th>
							<th className='py-3 px-4 text-left'>Passenger</th>
							<th className='py-3 px-4 text-left'>Booking #</th>
							<th className='py-3 px-4 text-left'>Account</th>
							<th className='py-3 px-4 text-left'>Booked By</th>
						</tr>
					</thead>
					<tbody>
						{createResponseArray?.length > 0 ? (
							createResponseArray.map((booking, index) => (
								<tr
									key={index}
									className={`hover:bg-gray-100 cursor-pointer`}
								>
									<td className='border px-4 py-2 whitespace-nowrap'>
										{new Date(booking?.date)
											.toLocaleDateString('en-GB')
											?.split('T')[0] +
											' ' +
											booking?.date?.split('T')[1]?.slice(0, 5)}
									</td>
									<td className='border px-4 py-2'>
										{booking?.passenger ? booking?.passenger : '-'}
									</td>
									<td className='border px-4 py-2'>{booking?.bookingId}</td>
									<td className='border px-4 py-2'>{booking?.accNo}</td>
									<td className='border px-4 py-2'>{booking?.bookedBy}</td>
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
