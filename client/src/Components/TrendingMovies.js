import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';

const TrendingMovies = ({ movies }) => {
	return (
		<>
			<div className='container'>
				<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
					Trending Movies of the Week{' '}
					<span>
						<Link to={{ pathname: '/pages/movie/2' }}>
							<i className='more fas fa-arrow-circle-right'></i>
						</Link>
					</span>
				</p>
				<div className='landing-grid'>
					{movies.map((movie) => (
						<Link
							to={{ pathname: `/media/${movie.id}`, state: { type: 'movie' } }}
							key={movie.id}>
							<Thumbnail media={movie} type={'movie'} />
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default TrendingMovies;
