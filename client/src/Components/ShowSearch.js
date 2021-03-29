import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';

const ShowSearch = ({ shows }) => {
	return (
		<div>
			<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
				Matching show results
			</p>
			<div className='landing-grid'>
				{shows.map(
					(show) =>
						show.poster_path !== null && (
							<Link
								to={{ pathname: `/media/${show.id}`, state: { type: 'tv' } }}
								key={show.id}>
								<Thumbnail media={show} type={'tv'} />
							</Link>
						)
				)}
			</div>
		</div>
	);
};

export default ShowSearch;