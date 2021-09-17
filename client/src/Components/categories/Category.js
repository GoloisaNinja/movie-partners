import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Thumbnail from '../Thumbnail';
import Seo from '../Seo';
import Loading from '../Loading';

const Category = ({ match, history }) => {
	useEffect(() => {
		if (localStorage.getItem('sortBy') === null) {
			localStorage.setItem('sortBy', 'popularity.desc');
			setSortBy(localStorage.getItem('sortBy'));
		}
	}, []);

	const [page, setPage] = useState(match.params.page);
	const [results, setResults] = useState();
	const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy'));
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const type = match.params.media_id;
	const genreId = match.params.genre_id;
	const genreName = match.params.genre_name;

	useEffect(() => {
		const getResults = async () => {
			try {
				const result = await axios.get(
					`https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
				);
				if (result) {
					setResults(result.data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, [page, apiKey, type, genreId, sortBy]);

	const handlePage = (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		window.scroll(0, 0);
		history.push(`/categories/${type}/${genreId}/${genreName}/${newPage}`);
	};

	const handleSort = (sort) => {
		if (localStorage.getItem('sortBy') !== sort) {
			localStorage.setItem('sortBy', sort);
			setSortBy(sort);
		}
	};
	useEffect(() => {
		setPage(match.params.page);
	}, [match.params.page]);

	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};

	return !results ? (
		<Loading />
	) : (
		<>
			<Seo
				lang={`en`}
				title={`${genreName} - ${type}`}
				description={`Browse ${genreName} results`}
				image={`https://www.wewatch.pw/assets/mp_logo.png`}
			/>
			<div className='container'>
				<p
					style={{
						fontSize: '2.5rem',
						fontWeight: '700',
						fontFamily: "'Inter', sans-serif",
					}}>
					{type === 'movie'
						? `${genreName} movies page ${page}`
						: `${genreName} shows page ${page}`}
				</p>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<p>
						Sorted by {sortBy === 'popularity.desc' ? 'popularity' : 'rating'}
					</p>
					<div className='sortButtons'>
						<button
							className='unBtn sortBtn fire'
							onClick={(e) => handleSort('popularity.desc')}>
							<i className='fas fa-fire-alt'></i>
						</button>
						<button
							className='unBtn sortBtn star'
							onClick={(e) =>
								handleSort('vote_average.desc&vote_count.gte=50')
							}>
							<i className='fas fa-star'></i>
						</button>
					</div>
				</div>

				<div className='landing-grid'>
					{results.results.map((item) => (
						<Link
							onClick={(e) => setScrollPosition()}
							to={{
								pathname: `/media/${type}/${item.id}`,
								state: { type: type },
							}}
							key={item.id}>
							<Thumbnail media={item} type={type} />
						</Link>
					))}
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
						disabled={parseInt(match.params.page) === results.total_pages}
						onClick={(e) => handlePage('+')}>
						<i className='chevNext fas fa-chevron-circle-right'></i>
					</button>
				</div>
			</div>
		</>
	);
};

export default Category;
