import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

const MediaRelated = ({ relatedMedia, type }) => {
	return (
		<>
			<p className='media-bottom-desc'>You Might Also Like</p>
			<div className='related-wrapper'>
				<div className='related-grid'>
					{relatedMedia.results.length > 0 &&
						relatedMedia.results.map((media) => (
							<Link
								key={media.id}
								to={{
									pathname: `/media/${type}/${media.id}`,
								}}
								replace={true}>
								<Thumbnail media={media} type={type} />
							</Link>
						))}
				</div>
			</div>
		</>
	);
};
export default MediaRelated;
