import React from 'react';

const ProfileThumbnail = ({ item }) => {
	return (
		<div className='thumbnail-container'>
			<img
				className='thumbnail-img'
				src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
				alt='content poster'
			/>
			<small className='thumbnail-title'>{item.name}</small>
		</div>
	);
};

export default ProfileThumbnail;
