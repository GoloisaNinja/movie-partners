import React from 'react';
import NoPoster from '../utils/mp_noPoster.png';

const Thumbnail = ({ media, type }) => {
	return (
		<div className='thumbnail-container'>
			<img
				className='thumbnail-img'
				src={
					media.poster_path !== null
						? `https://image.tmdb.org/t/p/original/${media.poster_path}`
						: NoPoster
				}
				width='200'
				height='300'
				alt='content poster'
			/>

			<small className='thumbnail-title'>
				{type === 'movie' ? media.title : media.name}
			</small>
		</div>
	);
};

export default Thumbnail;
