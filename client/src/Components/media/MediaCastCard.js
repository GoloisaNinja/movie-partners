import React from 'react';
import NoImageCast from '../../utils/mpPosterNA.png';

const MediaCastCard = ({ castMember }) => {
	return (
		<div className='media-card-container'>
			<img
				className='media-card-image'
				width='125'
				height='187'
				src={
					castMember.profile_path !== null
						? `https://image.tmdb.org/t/p/original/${castMember.profile_path}`
						: NoImageCast
				}
				alt={`${castMember.name}`}
			/>
			<div className='media-card-details'>
				<p className='media-card-character'>{castMember.character}</p>
				<p className='media-card-actor'>{castMember.name}</p>
			</div>
		</div>
	);
};
export default MediaCastCard;
