import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const TrendingShows = ({ shows }) => {
	return (
		<>
			<div className='container'>
				<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
					Trending Shows of the Week{' '}
					<span>
						<Link to={{ pathname: '/pages/tv/2' }}>
							<i className='more fas fa-arrow-circle-right'></i>
						</Link>
					</span>
				</p>
				<div className='landing-grid'>
					{shows.map(
						(show) =>
							show.poster_path !== null &&
							show.backdrop_path !== null && (
								<Link
									to={{
										pathname: `/media/tv/${show.id}`,
										state: { type: 'tv' },
									}}
									key={show.id}>
									<Thumbnail media={show} type={'tv'} />
								</Link>
							)
					)}
				</div>
			</div>
		</>
	);
};

export default TrendingShows;
