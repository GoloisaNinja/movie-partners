import React, { useReducer } from 'react';
import WatchlistContext from './watchlistContext';
import watchlistReducer from './watchlistReducer';
import axios from 'axios';

import { GET_WATCHLIST, ADD_TITLE } from './watchlistActions';

const WatchlistState = ({ children }) => {
	const initialState = {
		watchlist: {},
		watchlists: [],
	};
	const [state, dispatch] = useReducer(watchlistReducer, initialState);

	// Watchlist Functions

	// Get a Watchlist

	const getWatchlist = async (watchlist_id) => {
		try {
			const res = await axios.get(`/api/watchlist/get/${watchlist_id}`);
			dispatch({
				type: GET_WATCHLIST,
				payload: res.data,
			});
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
			dispatch({
				type: ADD_TITLE,
				payload: {
					title: res.data,
					watchlist: watchlist_id,
				},
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<WatchlistContext.Provider
			value={{
				watchlist: state.watchlist,
				watchlists: state.watchlists,
				addTitle,
				getWatchlist,
			}}>
			{children}
		</WatchlistContext.Provider>
	);
};

export default WatchlistState;
