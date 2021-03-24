import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';

const TrendingShows = ({ shows }) => {
	return (
		<>
			<div className='container'>
				<p style={{ fontSize: '3rem', fontWeight: '700' }}>
					Trending Shows of the Week
				</p>
				<div className='landing-grid'>
					{shows.map((show) => (
						<Link
							to={{ pathname: `/media/${show.id}`, state: { type: 'tv' } }}
							key={show.id}>
							<Thumbnail media={show} type={'tv'} />
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default TrendingShows;
