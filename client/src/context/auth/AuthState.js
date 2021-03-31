import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import SetAuthToken from '../../utils/SetAuthToken';

import {
	REGISTER_FAILURE,
	REGISTER_SUCCESS,
	LOAD_USER,
	LOGIN_USER,
	LOGOUT_USER,
} from './authActions';

const AuthState = ({ children }) => {
	const initialState = {
		loading: true,
		isAuthenticated: false,
		token: localStorage.getItem('token'),
		user: null,
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Auth Functions

	// Create/Register a User

	const registerUser = async (name, email, password) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const body = JSON.stringify({ name, email, password });
			const res = await axios.post(`/api/user`, body, config);
			if (res.status === 201) {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				});
			}
		} catch (e) {
			console.log(e.message);
			dispatch({
				type: REGISTER_FAILURE,
			});
		}
	};

	// Login a User

	const loginUser = async (email, password) => {
		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};
			const body = JSON.stringify({ email, password });
			const res = await axios.post('/api/user/login', body, config);
			if (res.status === 200) {
				dispatch({
					type: LOGIN_USER,
					payload: res.data,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Logout a User

	const logoutUser = async () => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.post('/api/user/logout', config);
			if (res.status === 200) {
				dispatch({
					type: LOGOUT_USER,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Load an Authenticated User

	const loadUser = async () => {
		if (localStorage.token) {
			SetAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get('/api/users/auth');
			if (res.status === 200) {
				dispatch({
					type: LOAD_USER,
					payload: res.data,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				loading: state.loading,
				isAuthenticated: state.isAuthenticated,
				token: state.token,
				user: state.user,
				registerUser,
				loginUser,
				logoutUser,
				loadUser,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
