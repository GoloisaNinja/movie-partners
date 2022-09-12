import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRelatedMedia } from '../../Api/Api';
import Thumbnail from '../Thumbnail';

const MediaRelated = ({ id, type }) => {
	const [related, setRelated] = useState({});

	const populateRelated = useCallback(() => {
		setTimeout(async () => {
			const relatedResult = await getRelatedMedia(type, id);
			setRelated(relatedResult);
		}, 3000);
	}, [id, type]);

	useEffect(() => {
		populateRelated();
		return () => {
			setRelated({});
		};
	}, [populateRelated]);

	return related.results?.length ? (
		<>
			<p className='media-bottom-desc'>You Might Also Like</p>
			<div className='related-wrapper'>
				<div className='related-grid'>
					{related.results.length > 0 &&
						related.results.map((media) => (
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
	) : (
		<>
			<p className='media-bottom-desc'>You Might Also Like</p>
			<div className='related-wrapper'>
				<div className='related-grid'>...loading related titles...</div>
			</div>
		</>
	);
};
export default MediaRelated;
