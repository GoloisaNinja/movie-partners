import React from 'react';
import { Link } from 'react-router-dom';

const TrendingShows = ({ shows }) => {
	return (
		<>
			{shows.map((show) => (
				<Link
					to={{ pathname: `/media/${show.id}`, state: { type: 'tv' } }}
					key={show.id}>
					<li>{show.name}</li>
				</Link>
			))}
		</>
	);
};

export default TrendingShows;
