import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const MovieSearch = ({ movies }) => {
	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	return (
		<div>
			<p
				style={{
					fontSize: '2.5rem',
					fontWeight: '700',
					fontFamily: "'Inter', sans-serif",
				}}>
				Matching movie results
			</p>
			<div className='landing-grid'>
				{movies.map(
					(movie) =>
						movie.poster_path !== null &&
						movie.backdrop_path !== null && (
							<Link
								onClick={(e) => setScrollPosition()}
								to={{
									pathname: `/media/movie/${movie.id}`,
									state: { type: 'movie' },
								}}
								key={movie.id}>
								<Thumbnail media={movie} type={'movie'} />
							</Link>
						)
				)}
			</div>
		</div>
	);
};

export default MovieSearch;
