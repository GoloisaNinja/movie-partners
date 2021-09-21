import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from '../../Api/Api';
import Thumbnail from '../Thumbnail';
import Loading from '../Loading';

const Pages = ({ match, history }) => {
	const [page, setPage] = useState(match.params.page);
	const [results, setResults] = useState();
	const [totalPages, setTotalPages] = useState();
	const type = match.params.media_id;
	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};
	useEffect(() => {
		const populateTrendingStatePage = async () => {
			try {
				const response = await getTrending('trending', type, page);
				if (response.media_results.length > 0) {
					setResults(response.media_results);
					setTotalPages(response.total_pages);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		populateTrendingStatePage();
	}, [page, type]);

	const handlePage = (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		window.scroll(0, 0);
		history.push(`/pages/${type}/${newPage}`);
	};
	useEffect(() => {
		setPage(match.params.page);
	}, [match.params.page]);

	return !results ? (
		<Loading />
	) : (
		<div className='container'>
			<p
				style={{
					fontSize: '2.5rem',
					fontWeight: '700',
					fontFamily: "'Inter', sans-serif",
				}}>
				{type === 'movie'
					? `Trending movies page ${page}`
					: `Trending shows page ${page}`}
			</p>
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
	);
};

export default Pages;
