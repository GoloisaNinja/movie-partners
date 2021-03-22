import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import watchlistContext from '../context/watchlist/watchlistContext';

const Media = ({ match, location }) => {
	const { type } = location.state;
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const media_id = match.params.id;
	const [media, setMedia] = useState({});
	const { watchlist } = useContext(watchlistContext);
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
			<div>
				<p>{watchlist.title}</p>
				<img
					style={{ width: '300px' }}
					src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
					alt='poster'
				/>
			</div>
			<div>
				<p>{type === 'movie' ? media.original_title : media.name}</p>
				<p>
					{media.tagline !== ''
						? media.tagline
						: `Creators couldn't even tagline this!`}
				</p>
				<p>{media.overview}</p>
				<ul>
					<li>Status: {media.status}</li>
					{type === 'tv' ? (
						<>
							<li>First aired: {media.first_air_date}</li>
							<li>No. of Episodes: {media.number_of_episodes}</li>
							<li>No. of Seasons: {media.number_of_seasons}</li>
							<li>Avg Episode Runtime: {media.episode_run_time} mins</li>
							<li>
								Networks:
								<ul>
									{media.networks.map((network) => (
										<li key={network.id}>{network.name}</li>
									))}
								</ul>
							</li>
						</>
					) : (
						<>
							<li>Release Date: {media.release_date}</li>
							<li>Runtime: {media.runtime} mins</li>
						</>
					)}
					<li>
						Rating: {media.vote_average} / out of {media.vote_count} votes
					</li>
				</ul>
			</div>
			<div>
				<iframe
					title={media.videos.results[0].id}
					width='420'
					height='315'
					src={`https://www.youtube.com/embed/${media.videos.results[0].key}`}></iframe>
			</div>
		</>
	);
};

export default Media;
