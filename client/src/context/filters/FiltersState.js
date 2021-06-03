import React, { useReducer } from 'react';
import FiltersContext from './filtersContext';
import filtersReducer from './filtersReducer';

import {
	SET_WATCHLIST_TEXT_FILTER,
	SET_WATCHLIST_GENRE_FILTER,
	SET_WATCHLIST_MEDIA_FILTER,
} from './filtersActions';

const FiltersState = ({ children }) => {
	const initialState = {
		watchlist: {
			textFilter: '',
			genreFilter: '',
			mediaFilter: '',
		},
	};
	const [state, dispatch] = useReducer(filtersReducer, initialState);

	// Filters Functions

	// Set text filter

	const setWatchlistTextFilter = (text = '') => {
		dispatch({
			type: SET_WATCHLIST_TEXT_FILTER,
			payload: text,
		});
	};

	// Set genre filter

	const setWatchlistGenreFilter = (genre = '') => {
		dispatch({
			type: SET_WATCHLIST_GENRE_FILTER,
			payload: genre,
		});
	};

	// Set media filter

	const setWatchlistMediaFilter = (media = '') => {
		dispatch({
			type: SET_WATCHLIST_MEDIA_FILTER,
			payload: media,
		});
	};

	return (
		<FiltersContext.Provider
			value={{
				watchlist: {
					textFilter: state.watchlist.textFilter,
					genreFilter: state.watchlist.genreFilter,
					mediaFilter: state.watchlist.mediaFilter,
				},
				setWatchlistTextFilter,
				setWatchlistGenreFilter,
				setWatchlistMediaFilter,
			}}>
			{children}
		</FiltersContext.Provider>
	);
};

export default FiltersState;
