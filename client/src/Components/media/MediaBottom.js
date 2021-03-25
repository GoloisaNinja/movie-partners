import React from 'react';
import MediaButtons from './MediaButtons';
import MediaGenres from './MediaGenres';
import MediaServices from './MediaServices';

const MediaBottom = ({ media, providers }) => {
	return (
		<>
			<div className='container'>
				<div className='media-bottom-info'>
					<p className='media-bottom-tag'>
						{media.tagline !== '' && media.tagline}
					</p>
					<p className='media-bottom-desc'>Plot Overview</p>
					<p className='media-bottom-overview'>{media.overview}</p>
				</div>
				<MediaGenres genres={media.genres} />
				{Object.keys(providers.results).length !== 0 && (
					<MediaServices providers={providers} />
				)}
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
