import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Thumbnail from './Thumbnail';

const Category = ({ match, history }) => {
	const [page, setPage] = useState(match.params.page);
	const [results, setResults] = useState();
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const type = match.params.media_id;
	const genreId = match.params.genre_id;
	const genreName = match.params.genre_name;

	useEffect(() => {
		const getResults = async () => {
			try {
				const result = await axios.get(
					`https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
				);
				if (result) {
					setResults(result.data.results);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, [page, apiKey, type, genreId]);

	const handlePage = (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		history.push(`/categories/${type}/${genreId}/${genreName}/${newPage}`);
	};
	useEffect(() => {
		setPage(match.params.page);
	}, [match.params.page]);

	return !results ? (
		<div>Loading...</div>
	) : (
		<div className='container'>
			<p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
				{type === 'movie'
					? `${genreName} movies page ${page}`
					: `${genreName} shows page ${page}`}
			</p>
			<div className='landing-grid'>
				{results.map(
					(item) =>
						item.poster_path !== null && (
							<Link
								to={{ pathname: `/media/${item.id}`, state: { type: type } }}
								key={item.id}>
								<Thumbnail media={item} type={type} />
							</Link>
						)
				)}
			</div>
			<div className='pages-buttons'>
				<button
					className='unBtn'
					disabled={page === '1'}
					onClick={(e) => handlePage('-')}>
					<i className='chevBack fas fa-chevron-circle-left'></i>
				</button>

				<button
					className='unBtn'
					disabled={match.params.page === '500'}
					onClick={(e) => handlePage('+')}>
					<i className='chevNext fas fa-chevron-circle-right'></i>
				</button>
			</div>
		</div>
	);
};

export default Category;
