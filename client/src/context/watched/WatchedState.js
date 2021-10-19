import React, { useReducer, useCallback } from 'react';
import WatchedContext from './watchedContext';
import watchedReducer from './watchedReducer';
import axios from 'axios';

import {
	GET_WATCHED,
	ADD_WATCHED,
	REMOVE_WATCHED,
	CLEAR_WATCHED,
} from './watchedActions';

const WatchedState = ({ children }) => {
	const initialState = {
		loading: true,
		watched: [],
	};
	const [state, dispatch] = useReducer(watchedReducer, initialState);

	// Watched Functions

	// Get Watched - memoized

	const getWatched = useCallback(async () => {
		const token = localStorage.getItem('token');
		try {
			const config = {
				headers: {
					'Content-type': 'applicaiton/json',
					Authorization: token,
				},
			};
			const res = await axios.get(`/api/watched`, config);
			dispatch({
				type: GET_WATCHED,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	}, []);

	// Get Watched

	// const getWatched = async () => {
	// 	const token = localStorage.getItem('token');
	// 	try {
	// 		const config = {
	// 			headers: {
	// 				'Content-type': 'applicaiton/json',
	// 				Authorization: token,
	// 			},
	// 		};
	// 		const res = await axios.get(`/api/watched`, config);
	// 		dispatch({
	// 			type: GET_WATCHED,
	// 			payload: res.data,
	// 		});
	// 	} catch (e) {
	// 		console.log(e.message);
	// 	}
	// };

	// Add title to Watched

	const addWatched = async (formData) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = formData;
		try {
			const res = await axios.post(`/api/watched/add`, body, config);
			dispatch({
				type: ADD_WATCHED,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Remove title from Watched

	const removeWatched = async (id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.delete(`/api/watched/remove/${id}`, config);
			if (res.status === 200) {
				dispatch({
					type: REMOVE_WATCHED,
					payload: id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Clear Watched

	const clearWatched = () => {
		dispatch({
			type: CLEAR_WATCHED,
		});
	};

	return (
		<WatchedContext.Provider
			value={{
				loading: state.loading,
				watched: state.watched,
				getWatched,
				addWatched,
				removeWatched,
				clearWatched,
			}}>
			{children}
		</WatchedContext.Provider>
	);
};

export default WatchedState;
