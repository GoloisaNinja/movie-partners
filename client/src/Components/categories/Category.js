import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryGenreTitles } from '../../Api/Api';
import Thumbnail from '../Thumbnail';
import Seo from '../Seo';
import Loading from '../Loading';
import ScrollToTop from '../../utils/ScrollToTop';

const Category = ({ match, history }) => {
	useEffect(() => {
		if (localStorage.getItem('sortBy') === null) {
			localStorage.setItem('sortBy', 'popularity.desc');
			setSortBy(localStorage.getItem('sortBy'));
		}
	}, []);

	const [page, setPage] = useState(match.params.page);
	const [results, setResults] = useState();
	const [totalPages, setTotalPages] = useState();
	const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy'));
	const type = match.params.media_id;
	const genreId = match.params.genre_id;
	const genreName = match.params.genre_name;

	useEffect(() => {
		const getResults = async () => {
			try {
				const mediaResult = await getCategoryGenreTitles(
					'discover',
					type,
					sortBy,
					page,
					genreId
				);
				if (mediaResult.media_results.length > 0) {
					setResults(mediaResult.media_results);
					setTotalPages(mediaResult.total_pages);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, [page, type, genreId, sortBy]);

	const handlePage = async (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		await history.push(
			`/categories/${type}/${genreId}/${genreName}/${newPage}`
		);
		window.scroll(0, 0);
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
		<>
			<ScrollToTop />
			<Loading />
		</>
	) : (
		<>
			<Seo
				lang={`en`}
				title={`${genreName} - ${type}`}
				description={`Browse ${genreName} results`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<div className='container'>
				<div style={{ marginBottom: '1rem' }} className='media-top-navigation'>
					<button onClick={(e) => history.push(`/categories`)}>
						back to categories
					</button>
				</div>
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
					{results.map((item) => (
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
						disabled={parseInt(match.params.page) === totalPages}
						onClick={(e) => handlePage('+')}>
						<i className='chevNext fas fa-chevron-circle-right'></i>
					</button>
				</div>
			</div>
			<ScrollToTop />
		</>
	);
};

export default Category;
