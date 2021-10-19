import React, { useReducer, useCallback } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import axios from 'axios';

import {
	CREATE_PROFILE,
	GET_PROFILE,
	CLEAR_PROFILE,
	GET_ALL_PROFILES,
	INVITE_PROFILE_TO_WATCHLIST,
	DECLINE_INVITE,
	ACCEPT_INVITE,
} from './profileActions';

const ProfileState = ({ children }) => {
	const initialState = {
		loading: true,
		profile: null,
		profiles: [],
	};
	const [state, dispatch] = useReducer(profileReducer, initialState);

	// Profile Functions

	// Get a Profile

	const getProfile = async () => {
		const token = localStorage.getItem('token');
		try {
			const config = {
				headers: {
					'Content-type': 'applicaiton/json',
					Authorization: token,
				},
			};
			const res = await axios.get(`/api/profile/me`, config);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Get all Profiles

	const getAllProfiles = useCallback(async () => {
		const token = localStorage.getItem('token');
		try {
			const config = {
				headers: {
					'Content-type': 'applicaiton/json',
					Authorization: token,
				},
			};
			const res = await axios.get(`/api/profile/all`, config);
			dispatch({
				type: GET_ALL_PROFILES,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	}, []);

	// const getAllProfiles = async () => {
	// 	const token = localStorage.getItem('token');
	// 	try {
	// 		const config = {
	// 			headers: {
	// 				'Content-type': 'applicaiton/json',
	// 				Authorization: token,
	// 			},
	// 		};
	// 		const res = await axios.get(`/api/profile/all`, config);
	// 		dispatch({
	// 			type: GET_ALL_PROFILES,
	// 			payload: res.data,
	// 		});
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };

	// Invite Watchlist

	const inviteWatchlist = async (watchlist_id, user_id, watchlist_name) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = JSON.stringify({ watchlist_name });
		try {
			const res = await axios.post(
				`/api/watchlist/invite/${watchlist_id}/${user_id}`,
				body,
				config
			);
			if (res.status === 201) {
				dispatch({
					type: INVITE_PROFILE_TO_WATCHLIST,
					payload: user_id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Decline Invite to Watchlist

	const declineInvite = async (invite_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.post(
				`/api/watchlist/decline/${invite_id}`,
				config
			);
			if (res.status === 200) {
				dispatch({
					type: DECLINE_INVITE,
					payload: invite_id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Accept Invite to Watchlist

	const acceptInvite = async (invite_id, watchlist_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.post(
				`/api/watchlist/accept/${invite_id}/${watchlist_id}`,
				config
			);
			if (res.status === 200) {
				dispatch({
					type: ACCEPT_INVITE,
					payload: invite_id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Create a new Profile

	const createProfile = async (formData) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = formData;
		try {
			const res = await axios.post(`/api/profile`, body, config);
			dispatch({
				type: CREATE_PROFILE,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Clear Profile

	const clearProfile = async () => {
		dispatch({
			type: CLEAR_PROFILE,
		});
	};

	return (
		<ProfileContext.Provider
			value={{
				loading: state.loading,
				profile: state.profile,
				profiles: state.profiles,
				getProfile,
				createProfile,
				clearProfile,
				getAllProfiles,
				inviteWatchlist,
				declineInvite,
				acceptInvite,
			}}>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
