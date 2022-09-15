import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const TrendingMovies = ({ movies }) => {
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
					Trending Movies of the Week{' '}
					<span>
						<Link to={{ pathname: '/pages/movie/2' }}>
							<i className='more fas fa-arrow-circle-right'></i>
						</Link>
					</span>
				</p>

				<div className='landing-grid'>
					{movies.map(
						(movie, index) =>
							movie.poster_path !== null &&
							movie.backdrop_path !== null && (
								<Link
									onClick={(e) => setScrollPosition()}
									to={{
										pathname: `/media/movie/${movie.id}`,
										state: { type: 'movie' },
									}}
									key={movie.id}>
									<Thumbnail media={movie} delay={index} />
								</Link>
							)
					)}
				</div>
				<Link
					onClick={(e) => window.scrollTo(0, 0)}
					to={{ pathname: '/pages/movie/2' }}>
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
						see more movies
					</p>
				</Link>
			</div>
		</>
	);
};

export default TrendingMovies;
