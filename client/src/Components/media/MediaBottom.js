import React, { useState, useEffect } from 'react';
import MediaButtons from './MediaButtons';
import MediaGenres from './MediaGenres';
import MediaServices from './MediaServices';
import axios from 'axios';

const MediaBottom = ({ media, type, media_id }) => {
	const [providers, setProviders] = useState({});
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	useEffect(() => {
		const getProviders = async () => {
			try {
				const providerResult = await axios.get(
					`https://api.themoviedb.org/3/${type}/${media_id}/watch/providers?api_key=${apiKey}&language=en-US&append_to_response=videos`
				);
				if (Object.keys(providerResult.data.results).length !== 0) {
					setProviders(providerResult.data);
				} else {
					setProviders({
						results: 'none',
					});
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getProviders();
	}, [apiKey, media_id, type]);
	return !providers.results ? (
		<p>loading...</p>
	) : (
		<>
			<div className='container'>
				<div className='media-bottom-info'>
					<p className='media-bottom-tag'>
						{media.tagline !== '' && media.tagline}
					</p>
					<p className='media-bottom-desc'>Plot Overview</p>
					<p className='media-bottom-overview'>{media.overview}</p>
				</div>
				<MediaGenres genres={media.genres} />
				{providers.results.US && <MediaServices providers={providers} />}
				<MediaButtons />
				{media.videos.results.length !== 0 && (
					<div className='media-bottom-iframe'>
						<iframe
							className='bottom-iframe'
							title={media.videos.results[0].id}
							src={`https://www.youtube.com/embed/${media.videos.results[0].key}`}></iframe>
					</div>
				)}
			</div>
		</>
	);
};

export default MediaBottom;
