import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import favoriteContext from '../../context/favorite/favoriteContext';
import watchedContext from '../../context/watched/watchedContext';
import MediaTop from './MediaTop';
import MediaBottom from './MediaBottom';

const Media = ({ match, location }) => {
	//const { type } = location.state;
	const type = match.params.type;
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const media_id = match.params.id;
	const [media, setMedia] = useState({});
	const { getFavorites } = useContext(favoriteContext);
	const { getWatched } = useContext(watchedContext);
	useEffect(() => {
		const getMedia = async () => {
			try {
				const mediaResult = await axios.get(
					`https://api.themoviedb.org/3/${type}/${media_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
				);

				if (mediaResult) {
					setMedia(mediaResult.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getMedia();
	}, [match.params.id, apiKey, media_id, type]);

	useEffect(() => {
		getFavorites();
		getWatched();
	}, [match.params.id]);
	return media === undefined || media.poster_path === undefined ? (
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
		<>
			<MediaTop media={media} type={type} />
			<MediaBottom media={media} type={type} media_id={media_id} />
		</>
	);
};

export default Media;
