/** @format */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRefreshedCOAEntry, setCoaDate } from '../context/coaEntrysSlice';
import { isValidDate } from '../utils/isValidDate';
import { formatDate } from '../utils/formatDate';

export default function CoaEntryList() {
	const dispatch = useDispatch();
	const { coaEntries, coaDate } = useSelector((state) => state.coaEntry);

	const date = coaDate && coaDate?.split('T')[0];
	console.log('logs---', coaEntries, coaDate);

	const sortedCoaEntries = [...coaEntries].sort(
		(a, b) => new Date(b.coaDateTime) - new Date(a.coaDateTime)
	);

	useEffect(() => {
		dispatch(getRefreshedCOAEntry(date));
	}, [dispatch, date]);

	return (
		<div className='p-2'>
			<div className='flex justify-between items-center p-4'>
				<input
					required
					type='datetime-local'
					className='bg-input text-foreground p-2 rounded-lg border border-border'
					value={formatDate(coaDate)}
					onChange={(e) => {
						if (!isValidDate(e.target.value)) return;
						dispatch(setCoaDate(e.target.value));
						return e.target.value;
					}}
				/>
			</div>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white'>
					<thead className='bg-gray-200 text-gray-600'>
						<tr>
							<th className='py-3 px-4 text-left'>COA Date/Time</th>
							<th className='py-3 px-4 text-left'>Journey Date/Time</th>
							<th className='py-3 px-4 text-left'>Pickup Address</th>
							<th className='py-3 px-4 text-left'>Passenger</th>
							<th className='py-3 px-4 text-left'>Account</th>
						</tr>
					</thead>
					<tbody>
						{sortedCoaEntries?.length > 0 ? (
							sortedCoaEntries.map((coa, index) => (
								<tr
									key={index}
									className={`hover:bg-gray-100`}
								>
									<td className='border px-4 py-2 whitespace-nowrap'>
										{new Date(coa?.coaDateTime)
											.toLocaleDateString('en-GB')
											?.split('T')[0] +
											' ' +
											coa?.coaDateTime?.split('T')[1]?.slice(0, 5)}
									</td>
									<td className='border px-4 py-2 whitespace-nowrap'>
										{new Date(coa?.journeyDateTime)
											.toLocaleDateString('en-GB')
											?.split('T')[0] +
											' ' +
											coa?.journeyDateTime?.split('T')[1]?.slice(0, 5)}
									</td>
									<td className='border px-4 py-2'>{coa?.pickupAddress}</td>
									<td className='border px-4 py-2'>
										{coa?.passengerName ? coa?.passengerName : '-'}
									</td>

									<td className='border px-4 py-2'>{coa?.accountNo}</td>
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
