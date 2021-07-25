import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const ShowSearch = ({ shows }) => {
	return (
		<div>
			<p
				style={{
					fontSize: '2.5rem',
					fontWeight: '700',
					fontFamily: "'Inter', sans-serif",
				}}>
				Matching show results
			</p>
			<div className='landing-grid'>
				{shows.map(
					(show) =>
						show.poster_path !== null &&
						show.backdrop_path !== null && (
							<Link
								to={{ pathname: `/media/tv/${show.id}`, state: { type: 'tv' } }}
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
