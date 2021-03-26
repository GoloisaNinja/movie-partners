import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';

const MovieSearch = ({ movies }) => {
	return (
		<div>
			<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
				Matching movie results
			</p>
			<div className='landing-grid'>
				{movies.map(
					(movie) =>
						movie.backdrop_path !== null && (
							<Link
								to={{
									pathname: `/media/${movie.id}`,
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
