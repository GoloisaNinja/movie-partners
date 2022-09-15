import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import favoriteContext from '../../context/favorite/favoriteContext';
import Seo from '../Seo';

const Favorites = () => {
	const { getFavorites, favorites } = useContext(favoriteContext);

	useEffect(() => {
		getFavorites();
	}, [getFavorites]);

	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	return (
		<>
			<Seo
				lang={`en`}
				title={`Favorites`}
				description={`Browse your favorite shows and movies here`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
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
						{favorites.map((favorite, index) => (
							<Link
								onClick={(e) => setScrollPosition()}
								to={{
									pathname: `/media/${favorite.media_type}/${favorite.tmdb_id}`,
									state: { type: favorite.media_type },
								}}
								key={favorite._id}>
								<Thumbnail
									key={favorite._id}
									media={favorite}
									type={favorite.media_type}
									delay={index}
								/>
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
