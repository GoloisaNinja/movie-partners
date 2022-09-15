import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import watchedContext from '../../context/watched/watchedContext';
import Seo from '../Seo';

const Watched = () => {
	const { getWatched, watched } = useContext(watchedContext);

	useEffect(() => {
		getWatched();
	}, [getWatched]);

	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	return (
		<>
			<Seo
				lang={`en`}
				title={`Watched movies and shows`}
				description={`Browse your watched content here`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
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
						{watched.map((watched, index) => (
							<Link
								onClick={(e) => setScrollPosition()}
								to={{
									pathname: `/media/${watched.media_type}/${watched.tmdb_id}`,
									state: { type: watched.media_type },
								}}
								key={watched._id}>
								<Thumbnail
									key={watched._id}
									media={watched}
									type={watched.media_type}
									delay={index}
								/>
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
