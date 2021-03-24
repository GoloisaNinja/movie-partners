import React from 'react';
import MediaButtons from './MediaButtons';

const MediaBottom = ({ media }) => {
	return (
		<>
			<div className='container'>
				<div className='media-bottom-info'>
					<p className='media-bottom-tag'>
						{media.tagline !== '' && media.tagline}
					</p>
					<p>{media.overview}</p>
				</div>
				<MediaButtons />
				<div className='media-bottom-iframe'>
					<iframe
						className='bottom-iframe'
						title={media.videos.results[0].id}
						src={`https://www.youtube.com/embed/${media.videos.results[0].key}`}></iframe>
				</div>
			</div>
		</>
	);
};

export default MediaBottom;
