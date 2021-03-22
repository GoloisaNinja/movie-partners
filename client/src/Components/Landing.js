import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrendingMovies from './TrendingMovies';
import TrendingShows from './TrendingShows';

const Landing = () => {
	const [movieTrending, setMovieTrending] = useState();
	const [showTrending, setShowTrending] = useState();
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;

	useEffect(() => {
		const getTrending = async () => {
			try {
				const movieResults = await axios.get(
					`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
				);
				const showResults = await axios.get(
					`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`
				);
				if (movieResults.data.results.length > 0) {
					setMovieTrending(movieResults.data.results);
				}
				if (showResults.data.results.length > 0) {
					setShowTrending(showResults.data.results);
				}
			} catch (error) {
				console.error(error);
			}
		};
		getTrending();
	}, [setMovieTrending, apiKey]);

	return (
		movieTrending !== undefined &&
		showTrending !== undefined && (
			<>
				<TrendingMovies movies={movieTrending} />
				<TrendingShows shows={showTrending} />
			</>
		)
	);
};

export default Landing;
