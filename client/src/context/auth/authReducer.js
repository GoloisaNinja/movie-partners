import {
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	LOGIN_USER,
	LOAD_USER,
} from './authActions';

const authReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
		case LOGIN_USER:
			return {
				...state,
				...payload,
				loading: false,
				isAuthenticated: true,
			};
		case LOAD_USER:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: payload,
			};
		case REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				token: null,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
