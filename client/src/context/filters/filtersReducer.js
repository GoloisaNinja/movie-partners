import { SET_WATCHLIST_TEXT_FILTER } from './filtersActions';

const filtersReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_WATCHLIST_TEXT_FILTER:
			return {
				...state,
				watchlist: {
					textFilter: payload,
				},
			};
		default:
			return state;
	}
};

export default filtersReducer;
