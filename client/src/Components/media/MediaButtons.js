import React, { useContext, useEffect, useState } from 'react';
import favoriteContext from '../../context/favorite/favoriteContext';
import watchedContext from '../../context/watched/watchedContext';

const MediaButtons = ({ media, type }) => {
	const { favorites, addFavorite, removeFavorite } = useContext(
		favoriteContext
	);
	const { watched, addWatched, removeWatched } = useContext(watchedContext);
	const [isFavorite, setIsFavorite] = useState();
	const [favoriteId, setFavoriteId] = useState();
	const [isWatched, setIsWatched] = useState();
	const [watchedId, setWatchedId] = useState();
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
		removeFavorite(favoriteId);
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
		removeWatched(watchedId);
		setIsWatched(false);
	};

	useEffect(() => {
		const checkFavorites = () => {
			for (let i = 0; i < favorites.length; i++) {
				if (
					favorites[i]['tmdb_id'] === media.id &&
					favorites[i]['media_type'] === type
				) {
					setIsFavorite(true);
					setFavoriteId(favorites[i]['_id']);
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
					setWatchedId(watched[i]['_id']);
				}
			}
		};
		checkWatched();
	}, [setIsWatched, watched, media.id]);
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
			<button className='btn watchlist-btn'>+ Watchlist</button>
			{isWatched ? (
				<button
					className='btn favorites-btn'
					onClick={(e) => handleRemoveWatched()}>
					<i className='fas fa-minus-square'></i> Watched
				</button>
			) : (
				<button
					className='btn favorites-btn'
					onClick={(e) => handleAddWatched()}>
					<i className='fas fa-plus-square'></i> Watched
				</button>
			)}
		</div>
	);
};

export default MediaButtons;
