import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import watchlistContext from '../../context/watchlist/watchlistContext';
import authContext from '../../context/auth/authContext';
import Modal from '../Modal';

const WatchlistCard = ({ watchlist }) => {
	const { activatedWatchlist, activateWatchlist, deleteWatchlist } =
		useContext(watchlistContext);
	const { user } = useContext(authContext);
	const handleActivate = () => {
		activateWatchlist(watchlist._id);
	};
	const [show, setShow] = useState(false);
	const content = {
		title: `Delete Watchlist?`,
		body: `Are you sure you want to delete ${watchlist.wl_name}`,
		icon: '/assets/mp_logoMenuDark.png',
		type: 'decision',
	};
	const handleClose = (shouldAction) => {
		setShow(false);
		if (shouldAction) {
			deleteWatchlist(watchlist._id);
		}
	};
	return (
		<>
			<div className='wrapper'>
				<div className='watchlist-overlay'></div>
				<div className='watchlist-content'>
					<Link to={`/watchlists/${watchlist._id}/1`}>
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
						<Link
							style={{ fontSize: '1.6rem' }}
							to={`/watchlists/${watchlist._id}/1`}>
							<span className='pink-span'>
								<strong>{watchlist.titles.length}</strong>
							</span>
						</Link>
					</p>
					<p>
						List partners:{' '}
						<span className='pink-span'>
							{watchlist.partners.length > 0 ? (
								<strong>
									{watchlist.partners
										.map((partner) => partner.partner_name)
										.toString()}
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
						<Link
							to={{
								pathname: '/people',
								state: { id: watchlist._id, wl_name: watchlist.wl_name },
							}}>
							<button className='btn watch-share'>Share</button>
						</Link>

						{user._id === watchlist.user._id && (
							<button
								className='btn watch-delete'
								onClick={(e) => setShow(true)}>
								<i className='fas fa-trash-alt'></i>
							</button>
						)}
					</div>
				</div>
			</div>
			<Modal show={show} handleClose={handleClose} content={content} />
		</>
	);
};

export default WatchlistCard;
