import React, { useContext, useEffect, useState } from 'react';
import favoriteContext from '../../context/favorite/favoriteContext';
import watchedContext from '../../context/watched/watchedContext';
import watchlistContext from '../../context/watchlist/watchlistContext';
import Modal from '../Modal';

const MediaButtons = ({ media, type }) => {
	const { favorites, addFavorite, removeFavorite } =
		useContext(favoriteContext);
	const { watched, addWatched, removeWatched } = useContext(watchedContext);
	const { activatedWatchlist, addTitle, removeTitle } =
		useContext(watchlistContext);
	const [favoriteId, setFavoriteId] = useState();
	const [watchedId, setWatchedId] = useState();
	const [isFavorite, setIsFavorite] = useState();
	const [isWatched, setIsWatched] = useState();
	const [inActiveWatchlist, setInActiveWatchlist] = useState();
	const [show, setShow] = useState(false);
	const [content, setContent] = useState({});

	const handleDismiss = () => {
		setShow(false);
	};
	const handleAddFav = (e) => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Added to Favorites!`,
			body: `${title} was added to your favorites`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		let genre;
		if (media.genres && media.genres.length > 0) {
			genre = media.genres[0].name;
		} else {
			genre = 'Unknown';
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
			primary_genre: genre,
		};
		addFavorite(mediaObj);
	};
	const handleRemoveFav = () => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Removed from Favorites`,
			body: `${title} was removed from your favorites`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		removeFavorite(favoriteId);
		setIsFavorite(false);
	};

	const handleAddWatched = () => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Added to Watched!`,
			body: `${title} was added to watched`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		let genre;
		if (media.genres && media.genres.length > 0) {
			genre = media.genres[0].name;
		} else {
			genre = 'Unknown';
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
			primary_genre: genre,
		};
		addWatched(mediaObj);
	};
	const handleRemoveWatched = () => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Removed from Watched`,
			body: `${title} was removed from watched`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		removeWatched(watchedId);
		setIsWatched(false);
	};

	const handleAddTitle = () => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Added to Watchlist!`,
			body: `${title} was added to ${activatedWatchlist.wl_name}`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		let genre;
		if (media.genres && media.genres.length > 0) {
			genre = media.genres[0].name;
		} else {
			genre = 'Unknown';
		}
		const mediaObj = {
			tmdb_id: media.id,
			name: title,
			poster_path: media.poster_path,
			media_type: type,
			primary_genre: genre,
		};
		addTitle(activatedWatchlist._id, mediaObj);
	};
	const handleRemoveTitle = () => {
		setShow(true);
		let title;
		if (type === 'movie') {
			title = media.title;
		} else {
			title = media.name;
		}
		setContent({
			title: `Removed from Watchlist`,
			body: `${title} was removed from ${activatedWatchlist.wl_name}`,
			icon: `/assets/mp_logoMenuDark.png`,
			type: 'dismiss',
		});
		removeTitle(activatedWatchlist._id, media.id);
		setInActiveWatchlist(false);
	};

	useEffect(() => {
		const checkFavorites = async () => {
			for (let i = 0; i < favorites.length; i++) {
				if (
					favorites[i]['tmdb_id'] === media.id &&
					favorites[i]['media_type'] === type
				) {
					setFavoriteId(favorites[i]['_id']);
					setIsFavorite(true);
				}
			}
		};
		checkFavorites();
	}, [setIsFavorite, favorites, media.id, type]);
	useEffect(() => {
		const checkWatched = () => {
			for (let i = 0; i < watched.length; i++) {
				if (
					watched[i]['tmdb_id'] === media.id &&
					watched[i]['media_type'] === type
				) {
					setWatchedId(watched[i]['_id']);
					setIsWatched(true);
				}
			}
		};
		checkWatched();
	}, [setIsWatched, watched, media.id, type]);
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
	}, [setInActiveWatchlist, activatedWatchlist, media.id, type]);

	return (
		<div className='profile-buttons'>
			{isFavorite ? (
				<button
					className='btn favorites-btn'
					onClick={(e) => handleRemoveFav(e)}>
					<i className='fas fa-minus-square'></i> Favorites
				</button>
			) : (
				<button className='btn favorites-btn' onClick={(e) => handleAddFav(e)}>
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
			<Modal show={show} handleDismiss={handleDismiss} content={content} />
		</div>
	);
};

export default MediaButtons;
