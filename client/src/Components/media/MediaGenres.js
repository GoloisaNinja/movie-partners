import React from 'react';

const MediaGenres = ({ genres }) => {
	return (
		<div className='genre-container'>
			<p className='media-bottom-desc'>Genres</p>
			{genres.length > 0 ? (
				<ul className='genre-ul'>
					{genres.map((genre) => (
						<li key={genre.id}>
							<i className='genicon fas fa-check-circle'></i> {genre.name}
						</li>
					))}
				</ul>
			) : (
				<p>this title has not associated genres...</p>
			)}
		</div>
	);
};

export default MediaGenres;
