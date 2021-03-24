import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import watchlistContext from '../../context/watchlist/watchlistContext';
import MediaTop from './MediaTop';
import MediaBottom from './MediaBottom';

const Media = ({ match, location }) => {
	const { type } = location.state;
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const media_id = match.params.id;
	const [media, setMedia] = useState({});
	const { watchlist, getWatchlist } = useContext(watchlistContext);
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

	console.log(media);
	return media === undefined || media.poster_path === undefined ? (
		<div>Loading...</div>
	) : (
		<>
			<MediaTop media={media} type={type} />
			<MediaBottom media={media} />
		</>
	);
};

export default Media;