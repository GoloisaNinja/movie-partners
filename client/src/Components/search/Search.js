import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieSearch from './MovieSearch';
import ShowSearch from './ShowSearch';
import Loading from '../Loading';

const Search = ({ match }) => {
	const searchString = match.params.search_string;
	const apiKey = process.env.REACT_APP_TMDB_APIKEY;
	const [movies, setMovies] = useState({});
	const [shows, setShows] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const getResults = async () => {
			try {
				const movieResults = await axios.get(
					`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchString}&page=1&include_adult=false`
				);
				if (movieResults) {
					setMovies(movieResults.data.results);
				}

				const showResults = await axios.get(
					`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${searchString}&page=1&include_adult=false`
				);
				if (showResults) {
					setShows(showResults.data.results);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getResults();
	}, [match.params.search_string, apiKey, searchString, setMovies, setShows]);

	return loading ? (
		<Loading />
	) : Object.keys(movies).length === 0 && Object.keys(shows).length === 0 ? (
		<div className='container'>No matching results found...</div>
	) : (
		<div className='container'>
			{Object.keys(movies).length !== 0 && <MovieSearch movies={movies} />}
			{Object.keys(shows).length !== 0 && <ShowSearch shows={shows} />}
		</div>
	);
};

export default Search;
