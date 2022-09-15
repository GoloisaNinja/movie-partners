import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const TrendingShows = ({ shows }) => {
	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	return (
		<>
			<div className='container'>
				<p
					style={{
						fontSize: '2.5rem',
						fontWeight: '700',
						fontFamily: "'Inter', sans-serif",
					}}>
					Trending Shows of the Week{' '}
					<span>
						<Link to={{ pathname: '/pages/tv/2' }}>
							<i className='more fas fa-arrow-circle-right'></i>
						</Link>
					</span>
				</p>
				<div className='landing-grid'>
					{shows.map(
						(show, index) =>
							show.poster_path !== null &&
							show.backdrop_path !== null && (
								<Link
									onClick={(e) => setScrollPosition()}
									to={{
										pathname: `/media/tv/${show.id}`,
										state: { type: 'tv' },
									}}
									key={show.id}>
									<Thumbnail media={show} delay={index} />
								</Link>
							)
					)}
				</div>
				<Link
					onClick={(e) => window.scrollTo(0, 0)}
					to={{ pathname: '/pages/tv/2' }}>
					<p
						className='more'
						style={{
							fontSize: '2.5rem',
							fontWeight: '700',
							fontFamily: "'Inter', sans-serif",
							textAlign: 'center',
							color: '#ff45e9',
							marginTop: '1.25rem',
						}}>
						see more tv
					</p>
				</Link>
			</div>
		</>
	);
};

export default TrendingShows;
