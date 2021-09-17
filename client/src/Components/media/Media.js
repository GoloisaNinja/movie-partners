import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const media_id = match.params.id;
	const [media, setMedia] = useState({});
	const [related, setRelated] = useState({});
	const [credits, setCredits] = useState({});
	const { getFavorites } = useContext(favoriteContext);
	const { getWatched } = useContext(watchedContext);

	// const ScrollToTopOnMount = () => {
	// 	useEffect(() => {
	// 		window.scrollTo(0, 0);
	// 	}, []);
	// 	return null;
	// };

	useEffect(() => {
		setMedia({});
		const getMedia = async () => {
			try {
				const mediaResult = await axios.get(
					`https://api.themoviedb.org/3/${type}/${media_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
				);
				const relatedResult = await axios.get(
					`https://api.themoviedb.org/3/${type}/${media_id}/similar?api_key=${apiKey}&language=en-US&page=1`
				);
				const mediaCredits = await axios.get(
					`https://api.themoviedb.org/3/${type}/${media_id}/credits?api_key=${apiKey}`
				);
				if (mediaResult) {
					setMedia(mediaResult.data);
				}
				if (relatedResult) {
					setRelated(relatedResult.data);
				}
				if (mediaCredits) {
					setCredits(mediaCredits.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getMedia();
	}, [match.params.id, apiKey, type]);

	useEffect(() => {
		getFavorites();
		getWatched();
	}, [match.params.id]);

	return media === undefined ||
		media.poster_path === undefined ||
		related === undefined ? (
		<Loading />
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
				image={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
			/>
			{/* <ScrollToTopOnMount /> */}
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
