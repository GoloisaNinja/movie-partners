import React from 'react';

const Thumbnail = ({ media, type }) => {
	return (
		<div className='thumbnail-container'>
			<img
				className='thumbnail-img'
				src={`https://image.tmdb.org/t/p/original/${media.poster_path}`}
				width='2000'
				height='3000'
				alt='content poster'
			/>

			<small className='thumbnail-title'>
				{type === 'movie' ? media.title : media.name}
			</small>
		</div>
	);
};

export default Thumbnail;
