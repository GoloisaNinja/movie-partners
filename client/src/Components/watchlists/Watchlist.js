import React, { useContext, useEffect } from 'react';
import WatchlistTitles from './WatchlistTitles';
import watchlistContext from '../../context/watchlist/watchlistContext';
import WatchlistFilters from './WatchlistFilters';

const Watchlist = ({ match }) => {
	const { activateWatchlist, getWatchlist, watchlist, loading } =
		useContext(watchlistContext);

	useEffect(() => {
		getWatchlist(match.params.watchlist_id);
		activateWatchlist(match.params.watchlist_id);
	}, []);

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
					<WatchlistFilters watchlistTitles={watchlist.titles} />
					<WatchlistTitles titles={watchlist.titles} />
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
