import React from 'react';
import { useHistory } from 'react-router-dom';
import BackDrop from '../../utils/mp_noBackdropBlank.png';
import NoPoster from '../../utils/mp_noPoster.png';

const MediaTop = ({ media, type }) => {
	const history = useHistory();
	const baseImageURL = `https://image.tmdb.org/t/p/original`;
	const handleScrollReset = () => {
		//const scrollPosition = localStorage.getItem('scrollPosition') || 0;
		history.goBack();
		// setTimeout(() => {
		// 	window.scrollTo(0, parseInt(scrollPosition));
		// }, 75);
	};
	return (
		<>
			<div className='media-top-outer'>
				<div className='media-top-backdrop'>
					<img
						className='backdrop'
						src={
							media.backdrop_path !== null
								? `${baseImageURL}/${media.backdrop_path}`
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
							className='media-top-poster-img'
							src={
								media.poster_path !== null
									? `${baseImageURL}/${media.poster_path}`
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
								Rating: {Math.round(media.vote_average)} / out of{' '}
								{media.vote_count} votes
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
