import { GET_WATCHLIST, ADD_TITLE } from './watchlistActions';

const watchlistReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_WATCHLIST:
			return {
				...state,
				watchlist: payload,
			};
		case ADD_TITLE:
			return {
				...state,
				watchlists: state.watchlists.map((watchlist) =>
					watchlist._id === payload.watchlist_id
						? { ...watchlist, titles: [payload.title, ...watchlist.titles] }
						: watchlist
				),
			};
		default:
			return state;
	}
};

export default watchlistReducer;
