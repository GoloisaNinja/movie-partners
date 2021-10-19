import React from 'react';
import NoPoster from '../../utils/mp_noPoster.png';

const ProfileThumbnail = ({ item }) => {
	return (
		<div className='thumbnail-container'>
			<img
				className='thumbnail-img'
				src={
					item.poster_path === null
						? NoPoster
						: `https://image.tmdb.org/t/p/original/${item.poster_path}`
				}
				width='200'
				height='300'
				alt='content poster'
			/>
			<small className='thumbnail-title'>{item.name}</small>
		</div>
	);
};

export default ProfileThumbnail;
