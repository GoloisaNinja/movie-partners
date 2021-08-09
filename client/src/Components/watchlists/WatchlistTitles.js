import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileThumbnail from '../favorites/ProfileThumbnail';
import filtersContext from '../../context/filters/filtersContext';
import getVisibleWatchlistTitles from '../../selectors/watchlist';

const WatchlistTitles = ({ titles }) => {
	const { watchlist } = useContext(filtersContext);
	const [visibleTitles, setVisibleTitles] = useState([]);
	useEffect(() => {
		const result = getVisibleWatchlistTitles({ titles, watchlist });
		setVisibleTitles(result);
	}, [setVisibleTitles, watchlist, titles]);
	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	return (
		visibleTitles?.length > 0 && (
			<div className='landing-grid'>
				{visibleTitles.map((title) => (
					<Link
						onClick={(e) => setScrollPosition()}
						to={{
							pathname: `/media/${title.media_type}/${title.tmdb_id}`,
							state: { type: title.media_type },
						}}
						key={title._id}>
						<ProfileThumbnail key={title._id} item={title} />
					</Link>
				))}
			</div>
		)
	);
};

export default WatchlistTitles;
