import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import Thumbnail from '../Thumbnail';
import filtersContext from '../../context/filters/filtersContext';
import getVisibleWatchlistTitles from '../../selectors/watchlist';

const WatchlistTitles = ({ titles, match }) => {
	const history = useHistory();
	const { watchlist } = useContext(filtersContext);
	const [visibleTitles, setVisibleTitles] = useState([]);
	const [paginatedVisible, setPaginatedVisible] = useState([]);
	const [page, setPage] = useState(match.params.page);
	const [totalPages, setTotalPages] = useState(1);
	const watchlistId = match.params.watchlist_id;

	const paginateVisibleTitles = useCallback(() => {
		const recordCount = 20;
		setTotalPages(Math.round(visibleTitles.length / recordCount) * 1);
		const start = parseInt(match.params.page) * recordCount - recordCount;
		const end = parseInt(match.params.page) * recordCount;
		setPaginatedVisible(visibleTitles.slice(start, end));
	}, [match.params.page, visibleTitles]);

	useEffect(() => {
		const result = getVisibleWatchlistTitles({ titles, watchlist });
		setVisibleTitles(result);
	}, [setVisibleTitles, watchlist, titles]);

	useEffect(() => {
		paginateVisibleTitles();
	}, [paginateVisibleTitles]);

	const setScrollPosition = () => {
		localStorage.setItem('scrollPosition', window.pageYOffset);
	};

	useEffect(() => {
		setPage(match.params.page);
	}, [match.params.page]);

	const handlePage = async (dir) => {
		let newPage;
		if (dir === '+') {
			newPage = parseInt(page) + 1;
		} else {
			newPage = parseInt(page) - 1;
		}
		await history.push(`/watchlists/${watchlistId}/${newPage}`);
		window.scroll(0, 0);
	};

	return (
		paginatedVisible?.length > 0 && (
			<>
				<div className='landing-grid'>
					{paginatedVisible.map((title, index) => (
						<Link
							onClick={(e) => setScrollPosition()}
							to={{
								pathname: `/media/${title.media_type}/${title.tmdb_id}`,
								state: { type: title.media_type },
							}}
							key={title._id}>
							<Thumbnail
								key={title._id}
								media={title}
								type={title.media_type}
								delay={index}
							/>
						</Link>
					))}
				</div>
				{visibleTitles?.length > 30 && (
					<>
						<div className='pages-buttons'>
							<button
								className='unBtn'
								disabled={parseInt(match.params.page) === 1}
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
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: '15px',
							}}>
							{page} / {totalPages}
						</div>
					</>
				)}
			</>
		)
	);
};

export default withRouter(WatchlistTitles);
