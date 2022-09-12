import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import filtersContext from '../../context/filters/filtersContext';

const WatchlistFilters = ({ watchlistTitles, watchlistId }) => {
	const {
		watchlist,
		setWatchlistTextFilter,
		setWatchlistGenreFilter,
		setWatchlistMediaFilter,
	} = useContext(filtersContext);
	const history = useHistory();
	const [genre, setGenre] = useState(watchlist.genreFilter);
	const [genres, setGenres] = useState([]);
	const [mediaType, setMediaType] = useState(watchlist.mediaFilter);
	useEffect(() => {
		const genres = watchlistTitles.map((title) => title.primary_genre);
		const cleanGenres = Array.from(new Set(genres));
		cleanGenres.sort();
		cleanGenres.unshift('No Genre Filter');
		setGenres(cleanGenres);
	}, [watchlistTitles]);
	useEffect(() => {
		if (watchlist.textFilter) {
			history.push(`/watchlists/${watchlistId}/1`);
		}
	}, [watchlist.textFilter, history, watchlistId]);
	const handleGenre = (e) => {
		setGenre(e.target.value);
		setWatchlistGenreFilter(e.target.value);
	};
	const handleMedia = (e) => {
		setMediaType(e.target.value);
		setWatchlistMediaFilter(e.target.value);
	};
	return (
		<>
			<div className='text-filter-wrapper'>
				{/* <label className='text-filter-label'>Search Watchlist</label> */}
				<input
					className='text-filter-input'
					type='text'
					placeholder='search watchlist...'
					value={watchlist.textFilter}
					onChange={(e) => setWatchlistTextFilter(e.target.value)}
				/>
			</div>
			{genres.length > 0 && (
				<>
					<div className='drop-filters-wrapper'>
						<div className='genre-filter-wrapper'>
							{/* <label className='genre-filter-label'>Filter by Genre</label> */}
							<select
								value={genre}
								className='filter form-select'
								name='genre'
								onChange={(e) => handleGenre(e)}>
								{genres.map((genre, index) => (
									<option key={index} value={index === 0 ? '' : genre}>
										{genre}
									</option>
								))}
							</select>
						</div>
						<div className='media-filter-wrapper'>
							{/* <label className='media-filter-label'>Filter by Media Type</label> */}
							<select
								value={mediaType}
								className='filter form-select'
								name='mediaType'
								onChange={(e) => handleMedia(e)}>
								<option value=''>No Media Filter</option>
								<option value='movie'>Movie</option>
								<option value='tv'>TV</option>
							</select>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default WatchlistFilters;
