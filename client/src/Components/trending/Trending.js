import React, { useState, useEffect } from 'react';
import { getTrending } from '../../Api/Api';
import Seo from '../Seo';
import TrendingMovies from './TrendingMovies';
import TrendingShows from './TrendingShows';
import Loading from '../Loading';

const Trending = () => {
	const [movieTrending, setMovieTrending] = useState();
	const [showTrending, setShowTrending] = useState();
	useEffect(() => {
		const populateTrendingState = async () => {
			try {
				const trendingMovies = await getTrending('trending', 'movie');
				const trendingTv = await getTrending('trending', 'tv');
				if (trendingMovies.media_results.length > 0) {
					setMovieTrending(trendingMovies.media_results);
				}
				if (trendingTv.media_results.length > 0) {
					setShowTrending(trendingTv.media_results);
				}
			} catch (error) {
				console.log(error);
			}
		};

		populateTrendingState();
	}, []);

	useEffect(() => {
		if (localStorage.getItem('sortBy') === null) {
			localStorage.setItem('sortBy', 'popularity.desc');
		}
	}, []);

	return movieTrending !== undefined && showTrending !== undefined ? (
		<>
			<Seo
				lang={`en`}
				title={`Trending`}
				description={`Trending movies and shows`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<TrendingMovies movies={movieTrending} />
			<TrendingShows shows={showTrending} />
		</>
	) : (
		<>
			<Seo
				lang={`en`}
				title={`Trending`}
				description={`Trending movies and shows`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<Loading />
		</>
	);
};

export default Trending;
