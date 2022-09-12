import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import WatchlistTitles from './WatchlistTitles';
import watchlistContext from '../../context/watchlist/watchlistContext';
import WatchlistFilters from './WatchlistFilters';
import Seo from '../Seo';
import Loading from '../Loading';

const Watchlist = ({ match }) => {
	const { activateWatchlist, getWatchlist, watchlist, loading } =
		useContext(watchlistContext);

	useEffect(() => {
		getWatchlist(match.params.watchlist_id);
		activateWatchlist(match.params.watchlist_id);
	}, [getWatchlist, activateWatchlist, match.params.watchlist_id]);

	return (
		<>
			<Seo
				lang={`en`}
				title={`Watchlist`}
				description={`Home for your watchlist`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			{loading ? (
				<Loading />
			) : watchlist !== null && watchlist.titles?.length > 0 ? (
				<>
					<Seo
						lang={`en`}
						title={`Watchlist - ${watchlist.wl_name}`}
						description={`Browse your watchlist here`}
						image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
					/>
					<div className='container'>
						<p
							style={{
								fontSize: '2.5rem',
								fontWeight: '700',
								fontFamily: "'Inter', sans-serif",
							}}>
							{watchlist.wl_name} <i className='favCrown fas fa-list'></i>
						</p>
						<WatchlistFilters
							watchlistTitles={watchlist.titles}
							watchlistId={watchlist._id}
						/>
						<WatchlistTitles titles={watchlist.titles} />
					</div>
				</>
			) : (
				<>
					<Seo
						lang={`en`}
						title={`Watchlist`}
						description={`Browse your watchlist here`}
						image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
					/>
					<div className='container'>
						<p style={{ marginTop: '2rem' }} className='profile-bio-desc'>
							Try adding some titles to see content here...
						</p>
					</div>
				</>
			)}
		</>
	);
};

export default withRouter(Watchlist);
