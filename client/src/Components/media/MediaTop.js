import React from 'react';
import { useHistory } from 'react-router-dom';
import BackDrop from '../../utils/imagena-comp.png';
import NoPoster from '../../utils/mpPosterNA.png';

const MediaTop = ({ media, type }) => {
	const history = useHistory();
	const handleScrollReset = () => {
		const scrollPosition = localStorage.getItem('scrollPosition') || 0;
		history.goBack();
		setTimeout(() => {
			window.scrollTo(0, parseInt(scrollPosition));
		}, 100);
	};
	return (
		<>
			<div className='media-top-outer'>
				<div className='media-top-backdrop'>
					<img
						className='backdrop'
						src={
							media.backdrop_path !== null
								? `https://image.tmdb.org/t/p/original/${media.backdrop_path}`
								: BackDrop
						}
						width='384'
						height='216'
						alt='backdrop'
					/>
					<div className='overlay'></div>
				</div>

				<div className='media-top-poster-info'>
					<div className='poster'>
						<img
							src={
								media.poster_path !== null
									? `https://image.tmdb.org/t/p/original/${media.poster_path}`
									: NoPoster
							}
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
							{history.action !== 'POP' && (
								<li>
									<div className='media-top-navigation'>
										<button onClick={(e) => handleScrollReset()}>
											go back
										</button>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default MediaTop;
