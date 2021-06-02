import React, { useReducer } from 'react';
import FiltersContext from './filtersContext';
import filtersReducer from './filtersReducer';

import { SET_WATCHLIST_TEXT_FILTER } from './filtersActions';

const FiltersState = ({ children }) => {
	const initialState = {
		watchlist: {
			textFilter: '',
		},
	};
	const [state, dispatch] = useReducer(filtersReducer, initialState);

	// Filters Functions

	const setWatchlistTextFilter = (text = '') => {
		dispatch({
			type: SET_WATCHLIST_TEXT_FILTER,
			payload: text,
		});
	};

	return (
		<FiltersContext.Provider
			value={{
				watchlist: { textFilter: state.watchlist.textFilter },
				setWatchlistTextFilter,
			}}>
			{children}
		</FiltersContext.Provider>
	);
};

export default FiltersState;
