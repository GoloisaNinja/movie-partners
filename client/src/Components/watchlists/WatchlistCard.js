import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import watchlistContext from '../../context/watchlist/watchlistContext';

const WatchlistCard = ({ watchlist }) => {
	const { activatedWatchlist, activateWatchlist } = useContext(
		watchlistContext
	);
	const handleActivate = () => {
		activateWatchlist(watchlist._id);
	};
	return (
		<div className='wrapper'>
			<div className='watchlist-overlay'></div>
			<div className='watchlist-content'>
				<Link to={`/watchlists/${watchlist._id}`}>
					<p className='profile-bio-desc'>
						<strong>{watchlist.wl_name}</strong>
					</p>
				</Link>
				{activatedWatchlist !== null &&
					activatedWatchlist._id === watchlist._id && (
						<small style={{ textAlign: 'center' }}>ACTIVE WATCHLIST</small>
					)}
				<img
					className='watchlist-avatar'
					src={watchlist.user.avatar}
					alt='avatar'
				/>
				<p>
					List owner:{' '}
					<span className='pink-span'>
						<strong>{watchlist.user.name}</strong>
					</span>
				</p>
				<p>
					List titles:{' '}
					<span className='pink-span'>
						<strong>{watchlist.titles.length}</strong>
					</span>
				</p>
				<p>
					List partners:{' '}
					<span className='pink-span'>
						{watchlist.partners.length > 0 ? (
							<strong>
								{watchlist.partners.map((partner) => partner.name).toString()}
							</strong>
						) : (
							<strong>none...</strong>
						)}
					</span>{' '}
				</p>
				<div className='watchlist-card-actions'>
					{(activatedWatchlist === null ||
						activatedWatchlist._id !== watchlist._id) && (
						<button
							className='btn watch-activate'
							onClick={(e) => handleActivate()}>
							Activate
						</button>
					)}
					<button className='btn watch-share'>Share</button>
				</div>
			</div>
		</div>
	);
};

export default WatchlistCard;
