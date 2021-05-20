import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileThumbnail from '../favorites/ProfileThumbnail';
import watchedContext from '../../context/watched/watchedContext';

const Watched = () => {
	const { getWatched, watched } = useContext(watchedContext);
	useEffect(() => {
		getWatched();
	}, []);
	return (
		<>
			<div className='container'>
				<p
					style={{
						fontSize: '2.5rem',
						fontWeight: '700',
						fontFamily: "'Inter', sans-serif",
					}}>
					Watched Collection <i className='favCrown fas fa-eye'></i>
				</p>
				{watched.length > 0 ? (
					<div className='landing-grid'>
						{watched.map((watched) => (
							<Link
								to={{
									pathname: `/media/${watched.media_type}/${watched.tmdb_id}`,
									state: { type: watched.media_type },
								}}
								key={watched._id}>
								<ProfileThumbnail key={watched._id} item={watched} />
							</Link>
						))}
					</div>
				) : (
					<p style={{ marginTop: '2rem' }} className='profile-bio-desc'>
						Try clicking watched on titles to see content here...
					</p>
				)}
			</div>
		</>
	);
};

export default Watched;
