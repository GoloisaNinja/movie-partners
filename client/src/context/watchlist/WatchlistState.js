import React, { useReducer } from 'react';
import WatchlistContext from './watchlistContext';
import watchlistReducer from './watchlistReducer';
import axios from 'axios';

import {
	GET_WATCHLIST,
	GET_ALL_WATCHLISTS,
	ADD_WATCHLIST_TITLE,
	REMOVE_WATCHLIST_TITLE,
	CREATE_WATCHLIST,
	CREATE_FAILURE,
	DELETE_WATCHLIST,
	ACTIVATE_WATCHLIST,
	DEACTIVATE_WATCHLIST,
} from './watchlistActions';

const WatchlistState = ({ children }) => {
	const initialState = {
		loading: true,
		activatedWatchlist: null,
		watchlist: null,
		watchlists: [],
	};
	const [state, dispatch] = useReducer(watchlistReducer, initialState);

	// Watchlist Functions

	// Create a new Watchlist

	const createWatchlist = async (name) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = JSON.stringify({ name });
		try {
			const res = await axios.post(`/api/watchlist/create`, body, config);
			if (res.status === 201) {
				dispatch({
					type: CREATE_WATCHLIST,
					payload: res.data,
				});

				dispatch({
					type: ACTIVATE_WATCHLIST,
					payload: res.data,
				});
				localStorage.setItem('activatedWatchlist', res.data._id);
			}
		} catch (e) {
			alert(e.message);
			dispatch({
				type: CREATE_FAILURE,
			});
			console.log(e.message);
		}
	};

	// Delete a Watchlist

	const deleteWatchlist = async (watchlist_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.delete(
				`/api/watchlist/delete/${watchlist_id}`,
				config
			);
			if (res.status === 200) {
				if (localStorage.getItem('activatedWatchlist') === watchlist_id) {
					localStorage.removeItem('activatedWatchlist');
					dispatch({
						type: DEACTIVATE_WATCHLIST,
					});
				}
				dispatch({
					type: DELETE_WATCHLIST,
					payload: watchlist_id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Get all Watchlists by User

	const getAllWatchlists = async () => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.get(`/api/watchlist/allwatchlists`, config);
			dispatch({
				type: GET_ALL_WATCHLISTS,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Get a Watchlist

	const getWatchlist = async (watchlist_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.get(`/api/watchlist/get/${watchlist_id}`, config);
			dispatch({
				type: GET_WATCHLIST,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Activate a Watchlist

	const activateWatchlist = async (watchlist_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.get(`/api/watchlist/get/${watchlist_id}`, config);
			dispatch({
				type: ACTIVATE_WATCHLIST,
				payload: res.data,
			});
			localStorage.setItem('activatedWatchlist', res.data._id);
		} catch (e) {
			console.log(e.message);
		}
	};

	// Add a Title to Watchlist

	const addTitle = async (watchlist_id, title) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = title;
		try {
			const res = await axios.post(
				`/api/watchlist/add/${watchlist_id}`,
				body,
				config
			);
			if (res.status === 200) {
				dispatch({
					type: ADD_WATCHLIST_TITLE,
					payload: title,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Remove a Title from Watchlist

	const removeTitle = async (watchlist_id, title_id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.delete(
				`/api/watchlist/remove/${watchlist_id}/${title_id}`,
				config
			);
			if (res.status === 200) {
				dispatch({
					type: REMOVE_WATCHLIST_TITLE,
					payload: title_id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<WatchlistContext.Provider
			value={{
				loading: state.loading,
				activatedWatchlist: state.activatedWatchlist,
				watchlist: state.watchlist,
				watchlists: state.watchlists,
				addTitle,
				removeTitle,
				getWatchlist,
				getAllWatchlists,
				activateWatchlist,
				createWatchlist,
				deleteWatchlist,
			}}>
			{children}
		</WatchlistContext.Provider>
	);
};

export default WatchlistState;
