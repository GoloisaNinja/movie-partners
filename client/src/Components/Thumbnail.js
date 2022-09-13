import React, { useState, useEffect } from 'react';
import NoPoster from '../utils/mp_noPoster.png';

const Thumbnail = ({ media, type, delay = 0 }) => {
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
						: media.poster_path !== null
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
