import React, { useContext } from 'react';
import filtersContext from '../../context/filters/filtersContext';

const WatchlistFilters = () => {
	const { watchlist, setWatchlistTextFilter } = useContext(filtersContext);
	return (
		<div className='text-filter-wrapper'>
			<label className='text-filter-label'>Search for Title</label>
			<input
				className='text-filter-input'
				type='text'
				placeholder='enter title here'
				value={watchlist.textFilter}
				onChange={(e) => setWatchlistTextFilter(e.target.value)}
			/>
		</div>
	);
};

export default WatchlistFilters;
