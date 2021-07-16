import React from 'react';
import { useHistory } from 'react-router-dom';

const MediaTop = ({ media, type }) => {
	const history = useHistory();
	return (
		<>
			<div className='media-top-outer'>
				<div className='media-top-backdrop'>
					<img
						className='backdrop'
						src={`https://image.tmdb.org/t/p/original/${media.backdrop_path}`}
						width='384'
						height='216'
						alt='backdrop'
					/>
					<div className='overlay'></div>
				</div>
				<div className='media-top-navigation'>
					<button onClick={() => history.goBack()}>go back</button>
				</div>
				<div className='media-top-poster-info'>
					<div className='poster'>
						<img
							src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
							alt='poster'
						/>
					</div>
					<div className='info'>
						<p className='info-title'>
							{type === 'movie' ? media.title : media.name}
						</p>
						<ul>
							<li>Status: {media.status}</li>
							{type === 'tv' ? (
								<>
									<li>First aired: {media.first_air_date}</li>
									<li>No. of Episodes: {media.number_of_episodes}</li>
									<li>No. of Seasons: {media.number_of_seasons}</li>
									<li>Avg Episode Runtime: {media.episode_run_time} mins</li>
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
				</div>
			</div>
		</>
	);
};

export default MediaTop;
