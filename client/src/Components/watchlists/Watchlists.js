import React, { useEffect, useContext, useState } from 'react';
import WatchlistCard from './WatchlistCard';
import watchlistContext from '../../context/watchlist/watchlistContext';

const Watchlists = () => {
	const { getAllWatchlists, watchlists, loading, createWatchlist } = useContext(
		watchlistContext
	);
	const [addForm, setAddForm] = useState(false);
	const [listName, setListName] = useState('');
	useEffect(() => {
		getAllWatchlists();
	}, []);
	const handleCreateList = () => {
		createWatchlist(listName.trim());
		setListName('');
	};
	return loading ? (
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
	) : (
		<div className='container'>
			<div className='profile-branding'>
				<h2>
					Movie <span className='pink-span'>Partners </span>Watchlists{' '}
					<span className='pink-span'>
						<i className='fas fa-couch'></i>
					</span>
				</h2>
			</div>
			<div>
				<button className='watch-create' onClick={(e) => setAddForm(!addForm)}>
					Create Watchlist
				</button>
			</div>
			{addForm && (
				<div className='nav-search'>
					<input
						className='nav-search__input'
						type='text'
						maxLength='30'
						placeholder='name your watchlist'
						id='listName'
						name='listName'
						value={listName}
						onChange={(e) => setListName(e.target.value)}
					/>
					<button className='unBtn' onClick={(e) => handleCreateList()}>
						<i className='search-btn fas fa-plus-square'></i>
					</button>
				</div>
			)}
			{watchlists.length > 0 ? (
				<div className='watchlist-grid'>
					{watchlists.map((watchlist) => (
						<WatchlistCard key={watchlist._id} watchlist={watchlist} />
					))}
				</div>
			) : (
				<p className='profile-bio-desc'>
					No current watchlists...you should make one!
				</p>
			)}
		</div>
	);
};

export default Watchlists;
