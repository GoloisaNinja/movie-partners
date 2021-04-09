import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileThumbnail from '../favorites/ProfileThumbnail';
import watchlistContext from '../../context/watchlist/watchlistContext';

const Watchlist = ({ match }) => {
	const { activateWatchlist, getWatchlist, watchlist, loading } = useContext(
		watchlistContext
	);
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
			) : watchlist.titles.length > 0 ? (
				<div className='container'>
					<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
						{watchlist.wl_name} <i className='favCrown fas fa-list'></i>
					</p>
					<div className='landing-grid'>
						{watchlist.titles.map((title) => (
							<Link
								to={{
									pathname: `/media/${title.tmdb_id}`,
									state: { type: title.media_type },
								}}
								key={title._id}>
								<ProfileThumbnail key={title._id} item={title} />
							</Link>
						))}
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
