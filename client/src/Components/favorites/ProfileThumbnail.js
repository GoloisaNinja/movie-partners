import React, { useEffect, useState } from 'react';
import NoPoster from '../../utils/mp_noPoster.png';

const ProfileThumbnail = ({ item, delay = 0 }) => {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			if (delay) {
				setTimeout(() => {
					setReady(true);
				}, delay * 50);
			} else {
				setReady(true);
			}
		}

		return () => {
			isMounted = false;
		};
	}, [delay]);
	return (
		<div className='thumbnail-container'>
			<img
				className='thumbnail-img'
				src={
					!ready
						? NoPoster
						: item.poster_path === null
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
