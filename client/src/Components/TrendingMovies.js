import React from 'react';
import { Link } from 'react-router-dom';

const TrendingMovies = ({ movies }) => {
	return (
		<>
			{movies.map((movie) => (
				<Link
					to={{ pathname: `/media/${movie.id}`, state: { type: 'movie' } }}
					key={movie.id}>
					<li>{movie.original_title}</li>
				</Link>
			))}
		</>
	);
};

export default TrendingMovies;
