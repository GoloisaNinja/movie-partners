import {
	GET_WATCHED,
	ADD_WATCHED,
	REMOVE_WATCHED,
	CLEAR_WATCHED,
} from './watchedActions';

const watchedReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_WATCHED:
			return {
				...state,
				loading: false,
				watched: payload,
			};
		case ADD_WATCHED:
			return {
				...state,
				loading: false,
				watched: [payload, ...state.watched],
			};
		case REMOVE_WATCHED:
			return {
				...state,
				loading: false,
				watched: state.watched.filter((watched) => watched._id !== payload),
			};
		case CLEAR_WATCHED:
			return {
				...state,
				loading: false,
				watched: [],
			};
		default:
			return state;
	}
};

export default watchedReducer;
