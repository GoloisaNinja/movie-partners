import { GET_PROFILE, CREATE_PROFILE, CLEAR_PROFILE } from './profileActions';

const profileReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
		case CREATE_PROFILE:
			return {
				...state,
				loading: false,
				profile: payload,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				loading: false,
				profile: null,
			};
		default:
			return state;
	}
};

export default profileReducer;
