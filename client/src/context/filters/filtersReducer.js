import {
	SET_WATCHLIST_TEXT_FILTER,
	SET_WATCHLIST_GENRE_FILTER,
	SET_WATCHLIST_MEDIA_FILTER,
} from './filtersActions';

const filtersReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_WATCHLIST_TEXT_FILTER:
			return {
				...state,
				watchlist: {
					textFilter: payload,
					genreFilter: state.watchlist.genreFilter,
					mediaFilter: state.watchlist.mediaFilter,
				},
			};
		case SET_WATCHLIST_GENRE_FILTER:
			return {
				...state,
				watchlist: {
					textFilter: state.watchlist.textFilter,
					genreFilter: payload,
					mediaFilter: state.watchlist.mediaFilter,
				},
			};
		case SET_WATCHLIST_MEDIA_FILTER:
			return {
				...state,
				watchlist: {
					textFilter: state.watchlist.textFilter,
					genreFilter: state.watchlist.genreFilter,
					mediaFilter: payload,
				},
			};
		default:
			return state;
	}
};

export default filtersReducer;
