import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryGenres } from '../../Api/Api';
import Seo from '../Seo';
import CategoryBadge from './CategoryBadge';
import Loading from '../Loading';

const Categories = () => {
	const [movieGenres, setMovieGenres] = useState([]);
	const [tvGenres, setTvGenres] = useState([]);
	useEffect(() => {
		const populateCategories = async () => {
			try {
				const movieGenresResult = await getCategoryGenres('genre', 'movie');
				if (movieGenresResult.length > 0) {
					setMovieGenres(movieGenresResult);
				}
				const tvGenresResult = await getCategoryGenres('genre', 'tv');
				if (tvGenresResult.length > 0) {
					setTvGenres(tvGenresResult);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		populateCategories();
	}, []);
	return movieGenres.length > 0 && tvGenres.length > 0 ? (
		<>
			<Seo
				lang={`en`}
				title={`Categories`}
				description={`Categories`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<div className='container'>
				<p
					style={{
						fontSize: '2.5rem',
						fontWeight: '700',
						fontFamily: "'Inter', sans-serif",
					}}>
					Movie Categories <i className='caticon fas fa-film'></i>
				</p>

				<div className='category-grid'>
					{movieGenres.map((genre) => (
						<div key={genre.id}>
							<Link
								onClick={(e) => window.scrollTo(0, 0)}
								to={`/categories/movie/${genre.id}/${genre.name}/1`}>
								<CategoryBadge
									key={genre.id}
									name={genre.name}
									type={'movie'}
								/>
							</Link>
						</div>
					))}
				</div>

				<p
					style={{
						fontSize: '2.5rem',
						fontWeight: '700',
						fontFamily: "'Inter', sans-serif",
						marginTop: '2.5rem',
					}}>
					Show Categories <i className='caticon fas fa-tv'></i>
				</p>
				<div className='category-grid'>
					{tvGenres.map((genre) => (
						<div key={genre.id}>
							<Link to={`/categories/tv/${genre.id}/${genre.name}/1`}>
								<CategoryBadge key={genre.id} name={genre.name} type={'tv'} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	) : (
		<Loading />
	);
};

export default Categories;
