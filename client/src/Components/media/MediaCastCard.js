import React, { useState, useEffect } from 'react';
import NoImageCast from '../../utils/mp_noPoster.png';

const MediaCastCard = ({ castMember }) => {
	const [castImgPath, setCastImgPath] = useState(null);
	useEffect(() => {
		if (castMember.profile_path) {
			setTimeout(() => {
				setCastImgPath(
					`https://image.tmdb.org/t/p/original${castMember.profile_path}`
				);
			}, 1000);
		}
	}, [castMember]);
	return (
		<div className='media-card-container'>
			<img
				className='media-card-image'
				width='125'
				height='187'
				src={castImgPath ? castImgPath : NoImageCast}
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
