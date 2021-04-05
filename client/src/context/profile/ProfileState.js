import React, { useReducer } from 'react';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import axios from 'axios';

import { CREATE_PROFILE, GET_PROFILE, CLEAR_PROFILE } from './profileActions';

const ProfileState = ({ children }) => {
	const initialState = {
		loading: true,
		profile: null,
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

	const clearProfile = () => {
		dispatch({
			type: CLEAR_PROFILE,
		});
	};

	return (
		<ProfileContext.Provider
			value={{
				loading: state.loading,
				profile: state.profile,
				getProfile,
				createProfile,
				clearProfile,
			}}>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
