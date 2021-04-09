import React, { useContext, useEffect, useState } from 'react';
import favoriteContext from '../../context/favorite/favoriteContext';
import watchedContext from '../../context/watched/watchedContext';
import watchlistContext from '../../context/watchlist/watchlistContext';

const MediaButtons = ({ media, type }) => {
	const { favorites, addFavorite, removeFavorite } = useContext(
		favoriteContext
	);
	const { watched, addWatched, removeWatched } = useContext(watchedContext);
	const { activatedWatchlist, addTitle, removeTitle } = useContext(
		watchlistContext
	);
	const [isFavorite, setIsFavorite] = useState();
	const [isWatched, setIsWatched] = useState();
	const [inActiveWatchlist, setInActiveWatchlist] = useState();
	const handleAddFav = () => {
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
		};
		addFavorite(mediaObj);
	};
	const handleRemoveFav = () => {
		removeFavorite(media.id);
		setIsFavorite(false);
	};

	const handleAddWatched = () => {
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
		};
		addWatched(mediaObj);
	};
	const handleRemoveWatched = () => {
		removeWatched(media.id);
		setIsWatched(false);
	};

	const handleAddTitle = () => {
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
		};
		addTitle(activatedWatchlist._id, mediaObj);
	};
	const handleRemoveTitle = () => {
		removeTitle(activatedWatchlist._id, media.id);
		setInActiveWatchlist(false);
	};

	useEffect(() => {
		const checkFavorites = () => {
			for (let i = 0; i < favorites.length; i++) {
				if (
					favorites[i]['tmdb_id'] === media.id &&
					favorites[i]['media_type'] === type
				) {
					setIsFavorite(true);
				}
			}
		};
		checkFavorites();
	}, [setIsFavorite, favorites, media.id]);
	useEffect(() => {
		const checkWatched = () => {
			for (let i = 0; i < watched.length; i++) {
				if (
					watched[i]['tmdb_id'] === media.id &&
					watched[i]['media_type'] === type
				) {
					setIsWatched(true);
				}
			}
		};
		checkWatched();
	}, [setIsWatched, watched, media.id]);
	useEffect(() => {
		const checkInWatchlist = () => {
			if (activatedWatchlist !== null) {
				for (let i = 0; i < activatedWatchlist.titles.length; i++) {
					if (
						activatedWatchlist.titles[i]['tmdb_id'] === media.id &&
						activatedWatchlist.titles[i]['media_type'] === type
					) {
						setInActiveWatchlist(true);
					}
				}
			}
		};
		checkInWatchlist();
	}, [setInActiveWatchlist, activatedWatchlist, media.id]);
	return (
		<div className='profile-buttons'>
			{isFavorite ? (
				<button
					className='btn favorites-btn'
					onClick={(e) => handleRemoveFav()}>
					<i className='fas fa-minus-square'></i> Favorites
				</button>
			) : (
				<button className='btn favorites-btn' onClick={(e) => handleAddFav()}>
					<i className='fas fa-plus-square'></i> Favorites
				</button>
			)}
			{inActiveWatchlist ? (
				<button
					className='btn watchlist-btn'
					onClick={(e) => handleRemoveTitle()}>
					<i className='fas fa-minus-square'></i> Watchlist
				</button>
			) : (
				<button
					className='btn watchlist-btn'
					disabled={activatedWatchlist === null}
					onClick={(e) => handleAddTitle()}>
					<i className='fas fa-plus-square'></i> Watchlist
				</button>
			)}
			{isWatched ? (
				<button
					className='btn watched-btn'
					onClick={(e) => handleRemoveWatched()}>
					<i className='fas fa-minus-square'></i> Watched
				</button>
			) : (
				<button className='btn watched-btn' onClick={(e) => handleAddWatched()}>
					<i className='fas fa-plus-square'></i> Watched
				</button>
			)}
		</div>
	);
};

export default MediaButtons;
