import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const ShowSearch = ({ shows }) => {
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
				Matching show results
			</p>
			<div className='landing-grid'>
				{shows.map(
					(show, index) =>
						show.poster_path !== null && (
							<Link
								onClick={(e) => setScrollPosition()}
								to={{ pathname: `/media/tv/${show.id}`, state: { type: 'tv' } }}
								key={show.id}>
								<Thumbnail media={show} type={'tv'} delay={index} />
							</Link>
						)
				)}
			</div>
		</div>
	);
};

export default ShowSearch;
