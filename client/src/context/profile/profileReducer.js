import {
	GET_PROFILE,
	CREATE_PROFILE,
	CLEAR_PROFILE,
	GET_ALL_PROFILES,
	INVITE_PROFILE_TO_WATCHLIST,
	DECLINE_INVITE,
	ACCEPT_INVITE,
} from './profileActions';

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
		case GET_ALL_PROFILES:
			return {
				...state,
				loading: false,
				profiles: payload,
			};
		case INVITE_PROFILE_TO_WATCHLIST:
			return {
				...state,
				loading: false,
				profiles: [
					...state.profiles.filter((profile) => profile.user._id !== payload),
				],
			};
		case DECLINE_INVITE:
		case ACCEPT_INVITE:
			return {
				...state,
				loading: false,
				profile: {
					...state.profile,
					invites: [
						...state.profile.invites.filter((invite) => invite._id !== payload),
					],
				},
			};
		case CLEAR_PROFILE:
			return {
				loading: true,
				profile: null,
				profiles: [],
			};
		default:
			return state;
	}
};

export default profileReducer;
