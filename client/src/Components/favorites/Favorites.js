import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileThumbnail from './ProfileThumbnail';
import favoriteContext from '../../context/favorite/favoriteContext';

const Favorites = () => {
	const { getFavorites, favorites } = useContext(favoriteContext);
	useEffect(() => {
		getFavorites();
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
					Favorites Collection <i className='favCrown fas fa-crown'></i>
				</p>
				{favorites.length > 0 ? (
					<div className='landing-grid'>
						{favorites.map((favorite) => (
							<Link
								to={{
									pathname: `/media/${favorite.media_type}/${favorite.tmdb_id}`,
									state: { type: favorite.media_type },
								}}
								key={favorite._id}>
								<ProfileThumbnail key={favorite._id} item={favorite} />
							</Link>
						))}
					</div>
				) : (
					<p style={{ marginTop: '2rem' }} className='profile-bio-desc'>
						Try adding some favorites to see content here...
					</p>
				)}
			</div>
		</>
	);
};

export default Favorites;
