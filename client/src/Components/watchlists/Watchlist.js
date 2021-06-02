import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileThumbnail from '../favorites/ProfileThumbnail';
import watchlistContext from '../../context/watchlist/watchlistContext';
import WatchlistFilters from './WatchlistFilters';
import getVisibleWatchlistTitles from '../../selectors/watchlist';
import filtersContext from '../../context/filters/filtersContext';

const Watchlist = ({ match, history }) => {
	const { activateWatchlist, getWatchlist, watchlist, loading } =
		useContext(watchlistContext);
	const { watchlist: myWatchlist } = useContext(filtersContext);
	const [page, setPage] = useState('1');
	const handlePage = (direction) => {
		let newPage;
		if (direction === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		history.push(`/watchlists/${match.params.watchlist_id}/${newPage}`);
	};
	useEffect(() => {
		getWatchlist(match.params.watchlist_id, match.params.page);
		activateWatchlist(match.params.watchlist_id);
	}, [page]);
	useEffect(() => {
		setPage(match.params.page);
	}, [match.params.page]);
	return (
		<>
			{loading ? (
				<div
					style={{
						minHeight: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}>
					...
				</div>
			) : watchlist !== null && watchlist.titles?.length > 0 ? (
				<div className='container'>
					<p
						style={{
							fontSize: '2.5rem',
							fontWeight: '700',
							fontFamily: "'Inter', sans-serif",
						}}>
						{watchlist.wl_name} <i className='favCrown fas fa-list'></i>
					</p>
					<WatchlistFilters />
					<div className='landing-grid'>
						{getVisibleWatchlistTitles(
							watchlist.titles,
							myWatchlist.textFilter
						).map((title) => (
							<Link
								to={{
									pathname: `/media/${title.media_type}/${title.tmdb_id}`,
									state: { type: title.media_type },
								}}
								key={title._id}>
								<ProfileThumbnail key={title._id} item={title} />
							</Link>
						))}
					</div>
					<div className='pages-buttons'>
						<button
							className='unBtn'
							disabled={page === '1'}
							onClick={(e) => handlePage('-')}>
							<i className='chevBack fas fa-chevron-circle-left'></i>
						</button>

						<button
							className='unBtn'
							disabled={parseInt(match.params.page) === watchlist.pages}
							onClick={(e) => handlePage('+')}>
							<i className='chevNext fas fa-chevron-circle-right'></i>
						</button>
					</div>
				</div>
			) : (
				<div className='container'>
					<p style={{ marginTop: '2rem' }} className='profile-bio-desc'>
						Try adding some titles to see content here...
					</p>
				</div>
			)}
		</>
	);
};

export default Watchlist;
