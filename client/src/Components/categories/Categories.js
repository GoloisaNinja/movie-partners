import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Seo from '../Seo';
import CategoryBadge from './CategoryBadge';
import Loading from '../Loading';

const Categories = () => {
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const [movieGenres, setMovieGenres] = useState([]);
	const [tvGenres, setTvGenres] = useState([]);
	useEffect(() => {
		const getResults = async () => {
			try {
				const movieGensResult = await axios.get(
					`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
				);
				if (movieGensResult) {
					setMovieGenres(movieGensResult.data.genres);
				}
				const tvGensResult = await axios.get(
					`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
				);
				if (tvGensResult) {
					setTvGenres(tvGensResult.data.genres);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, [apiKey]);
	return movieGenres.length > 0 && tvGenres.length > 0 ? (
		<>
			<Seo
				lang={`en`}
				title={`Categories`}
				description={`Categories`}
				image={`https://www.wewatch.pw/assets/mp_logo.png`}
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
