import React, { useState, useEffect, useContext, useCallback } from 'react';
import { getMedia, getMediaCredits } from '../../Api/Api';
import favoriteContext from '../../context/favorite/favoriteContext';
import watchedContext from '../../context/watched/watchedContext';
import MediaTop from './MediaTop';
import Seo from '../Seo';
import MediaBottom from './MediaBottom';
import MediaRelated from './MediaRelated';
import Loading from '../Loading';
import ScrollToTop from '../../utils/ScrollToTop';

const Media = ({ match }) => {
	//const { type } = location.state;
	const type = match.params.type;
	const media_id = match.params.id;
	const [media, setMedia] = useState({});
	const [credits, setCredits] = useState({});
	const { getFavorites, favorites } = useContext(favoriteContext);
	const { getWatched, watched } = useContext(watchedContext);
	const baseImageURL = `https://image.tmdb.org/t/p/original`;

	useEffect(() => {
		let attempts = 0;
		setMedia({});
		const populateMediaComponentStates = async () => {
			try {
				const mediaResult = await getMedia(type, media_id);
				const mediaCredits = await getMediaCredits(type, media_id);
				if (mediaResult) {
					setMedia(mediaResult);
				}
				if (mediaCredits) {
					setCredits(mediaCredits);
				}
			} catch (error) {
				if (attempts < 4) {
					attempts++;
					console.log('attempting another request after failure...');
					populateMediaComponentStates();
				}
				console.error(error);
			}
		};
		populateMediaComponentStates();

		return () => {
			if (localStorage.getItem('scrollPosition')) {
				setTimeout(() => {
					window.scroll(0, parseInt(localStorage.getItem('scrollPosition')));
				}, 80);
			}
		};
	}, [match.params.id, type, media_id]);

	const checkCurrentFavorites = useCallback(() => {
		getFavorites();
	}, [getFavorites]);

	const checkCurrentWatched = useCallback(() => {
		getWatched();
	}, [getWatched]);

	useEffect(() => {
		if (!watched?.length) {
			checkCurrentWatched();
		}
	}, [checkCurrentWatched, watched, watched.length]);

	useEffect(() => {
		if (!favorites?.length) {
			checkCurrentFavorites();
		}
	}, [checkCurrentFavorites, favorites, favorites.length]);

	return media === undefined || media.poster_path === undefined ? (
		<>
			<ScrollToTop />
			<Loading />
		</>
	) : (
		<>
			<Seo
				title={type === 'movie' ? media.title : media.name}
				description={
					type === 'movie'
						? `${media.title} shared from weWatch`
						: `${media.name} shared from weWatch`
				}
				lang={'en'}
				image={`${baseImageURL}/${media.backdrop_path}`}
			/>
			{media !== undefined && <MediaTop media={media} type={type} />}
			{media !== undefined && (
				<MediaBottom
					media={media}
					type={type}
					media_id={media_id}
					credits={credits}
				/>
			)}
			<MediaRelated id={media_id} type={type} />
			<ScrollToTop />
		</>
	);
};

export default Media;
