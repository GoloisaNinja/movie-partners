import {
	GET_FAVORITES,
	ADD_FAVORITE,
	REMOVE_FAVORITE,
	CLEAR_FAVORITES,
} from './favoriteActions';

const favoriteReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_FAVORITES:
			return {
				...state,
				loading: false,
				favorites: payload,
			};
		case ADD_FAVORITE:
			return {
				...state,
				loading: false,
				favorites: [payload, ...state.favorites],
			};
		case REMOVE_FAVORITE:
			return {
				...state,
				loading: false,
				favorites: state.favorites.filter(
					(favorite) => favorite._id !== payload
				),
			};
		case CLEAR_FAVORITES:
			return {
				...state,
				loading: false,
				favorites: [],
			};
		default:
			return state;
	}
};

export default favoriteReducer;
