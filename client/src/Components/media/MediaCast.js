import React, { useRef } from 'react';
import usePosition from '../../utils/usePosition';
import CastCard from './MediaCastCard';

const MediaCast = ({ cast }) => {
	const castLength = cast.length;
	if (castLength > 20) {
		cast = cast.slice(0, 20);
	}
	const ref = useRef();
	const { hasItemOnLeft, hasItemOnRight, scrollLeft, scrollRight } =
		usePosition(ref);
	return (
		<div className='genre-container'>
			<p className='media-bottom-desc'>Cast</p>
			<div
				className='carousel-container'
				role='region'
				aria-label='Cast Carousel'>
				<div className='cast-carousel' ref={ref}>
					{cast.map((castMember) => (
						<CastCard key={castMember.id} castMember={castMember} />
					))}
				</div>
				{hasItemOnLeft && (
					<i
						aria-label='Previous Slides'
						className='carousel-button-left fas fa-chevron-circle-left'
						onClick={scrollLeft}></i>
				)}
				{!!hasItemOnRight && (
					<i
						aria-label='Next Slides'
						className='carousel-button-right fas fa-chevron-circle-right'
						onClick={scrollRight}></i>
				)}
			</div>
		</div>
	);
};

export default MediaCast;
