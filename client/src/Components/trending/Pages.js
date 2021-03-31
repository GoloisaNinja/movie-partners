import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Thumbnail from '../Thumbnail';

const Pages = ({ match, history }) => {
	const [page, setPage] = useState(match.params.page);
	const [results, setResults] = useState();
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const type = match.params.media_id;

	useEffect(() => {
		const getResults = async () => {
			try {
				const result = await axios.get(
					`https://api.themoviedb.org/3/trending/${type}/week?page=${page}&api_key=${apiKey}`
				);
				if (result) {
					setResults(result.data.results);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, [page, apiKey, type]);

	const handlePage = (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		history.push(`/pages/${type}/${newPage}`);
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
					? `Trending movies page ${page}`
					: `Trending shows page ${page}`}
			</p>
			<div className='landing-grid'>
				{results.map(
					(item) =>
						item.poster_path !== null &&
						item.backdrop_path !== null && (
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
					disabled={match.params.page === '1000'}
					onClick={(e) => handlePage('+')}>
					<i className='chevNext fas fa-chevron-circle-right'></i>
				</button>
			</div>
		</div>
	);
};

export default Pages;
