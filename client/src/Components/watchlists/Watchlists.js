import React, { useEffect, useContext, useState } from 'react';
import WatchlistCard from './WatchlistCard';
import watchlistContext from '../../context/watchlist/watchlistContext';
import Seo from '../Seo';
import Loading from '../Loading';

const Watchlists = () => {
	const { getAllWatchlists, watchlists, loading, createWatchlist } =
		useContext(watchlistContext);
	const [addForm, setAddForm] = useState(false);
	const [listName, setListName] = useState('');
	useEffect(() => {
		getAllWatchlists();
	}, [getAllWatchlists]);
	const handleCreateList = (e) => {
		e.preventDefault();
		createWatchlist(listName.trim());
		setListName('');
	};
	return loading ? (
		<Loading />
	) : (
		<>
			<Seo
				lang={`en`}
				title={`Watchlists`}
				description={`Home for your watchlists`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
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
					<button
						className='watch-create'
						onClick={(e) => setAddForm(!addForm)}>
						Create Watchlist
					</button>
				</div>
				{addForm && (
					<div className='nav-search'>
						<form
							style={{ width: '100%' }}
							onSubmit={(e) => handleCreateList(e)}>
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
							<button className='unBtn' type='submit' htmlFor='listName'>
								<i className='search-btn fas fa-plus-square'></i>
							</button>
						</form>
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
		</>
	);
};

export default Watchlists;
