import React, { useState, useEffect, useContext } from 'react';
import { getMedia, getRelatedMedia, getMediaCredits } from '../../Api/Api';
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
	const [related, setRelated] = useState({});
	const [credits, setCredits] = useState({});
	const { getFavorites } = useContext(favoriteContext);
	const { getWatched } = useContext(watchedContext);
	const baseImageURL = `https://image.tmdb.org/t/p/original`;

	useEffect(() => {
		setMedia({});
		const populateMediaComponentStates = async () => {
			try {
				const mediaResult = await getMedia(type, media_id);
				const relatedResult = await getRelatedMedia(type, media_id);
				const mediaCredits = await getMediaCredits(type, media_id);
				if (mediaResult) {
					setMedia(mediaResult);
				}
				if (relatedResult) {
					setRelated(relatedResult);
				}
				if (mediaCredits) {
					setCredits(mediaCredits);
				}
			} catch (error) {
				console.error(error);
			}
		};
		populateMediaComponentStates();
	}, [match.params.id, type]);

	useEffect(() => {
		getFavorites();
		getWatched();
	}, [match.params.id]);

	return media === undefined ||
		media.poster_path === undefined ||
		related === undefined ? (
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
			{related?.results?.length > 0 && (
				<MediaRelated relatedMedia={related} type={type} />
			)}
			<ScrollToTop />
		</>
	);
};

export default Media;
