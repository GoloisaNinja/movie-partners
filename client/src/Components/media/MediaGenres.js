import React from 'react';

const MediaGenres = ({ genres }) => {
	return (
		<div className='genre-container'>
			<p className='media-bottom-desc'>Genres</p>

			<ul className='genre-ul'>
				{genres.map((genre) => (
					<li key={genre.id}>
						<i className='genicon fas fa-check-circle'></i> {genre.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MediaGenres;
