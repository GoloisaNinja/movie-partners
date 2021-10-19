import {
	GET_WATCHLIST,
	GET_ALL_WATCHLISTS,
	ADD_WATCHLIST_TITLE,
	REMOVE_WATCHLIST_TITLE,
	CREATE_WATCHLIST,
	CREATE_FAILURE,
	DELETE_WATCHLIST,
	ACTIVATE_WATCHLIST,
	DEACTIVATE_WATCHLIST,
	CLEAR_WATCHLIST_STATE,
} from './watchlistActions';

const watchlistReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CREATE_WATCHLIST:
			return {
				...state,
				loading: false,
				watchlists: [payload, ...state.watchlists],
			};
		case CREATE_FAILURE:
			return {
				...state,
				loading: false,
			};
		case DELETE_WATCHLIST:
			return {
				...state,
				loading: false,
				watchlists: [
					...state.watchlists.filter((watchlist) => watchlist._id !== payload),
				],
			};
		case GET_WATCHLIST:
			return {
				...state,
				loading: false,
				watchlist: payload,
			};
		case ACTIVATE_WATCHLIST:
			return {
				...state,
				loading: false,
				activatedWatchlist: payload,
			};
		case DEACTIVATE_WATCHLIST:
			return {
				...state,
				loading: false,
				activatedWatchlist: null,
			};
		case GET_ALL_WATCHLISTS:
			return {
				...state,
				loading: false,
				watchlists: payload,
			};
		case ADD_WATCHLIST_TITLE:
			return {
				...state,
				loading: false,
				activatedWatchlist: {
					...state.activatedWatchlist,
					titles: [payload, ...state.activatedWatchlist.titles],
				},
			};
		case REMOVE_WATCHLIST_TITLE:
			return {
				...state,
				loading: false,
				activatedWatchlist: {
					...state.activatedWatchlist,
					titles: [
						...state.activatedWatchlist.titles.filter(
							(title) => title.tmdb_id !== payload
						),
					],
				},
			};
		case CLEAR_WATCHLIST_STATE:
			return {
				loading: true,
				activatedWatchlist: null,
				watchlist: null,
				watchlists: [],
			};
		default:
			return state;
	}
};

export default watchlistReducer;
