import React, { useReducer } from 'react';
import FavoriteContext from './favoriteContext';
import favoriteReducer from './favoriteReducer';
import axios from 'axios';

import {
	GET_FAVORITES,
	ADD_FAVORITE,
	REMOVE_FAVORITE,
	CLEAR_FAVORITES,
} from './favoriteActions';

const FavoriteState = ({ children }) => {
	const initialState = {
		loading: true,
		favorites: [],
	};
	const [state, dispatch] = useReducer(favoriteReducer, initialState);

	// Favorite Functions

	// Get Favorites

	const getFavorites = async () => {
		const token = localStorage.getItem('token');
		try {
			const config = {
				headers: {
					'Content-type': 'applicaiton/json',
					Authorization: token,
				},
			};
			const res = await axios.get(`/api/favorite`, config);
			dispatch({
				type: GET_FAVORITES,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Add title to Favorites

	const addFavorite = async (formData) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		const body = formData;
		try {
			const res = await axios.post(`/api/favorite/add`, body, config);
			dispatch({
				type: ADD_FAVORITE,
				payload: res.data,
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	// Remove title from Favorites

	const removeFavorite = async (id) => {
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-type': 'application/json',
				Authorization: token,
			},
		};
		try {
			const res = await axios.delete(`/api/favorite/remove/${id}`, config);
			if (res.status === 200) {
				dispatch({
					type: REMOVE_FAVORITE,
					payload: id,
				});
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Clear Favorites

	const clearFavorites = () => {
		dispatch({
			type: CLEAR_FAVORITES,
		});
	};

	return (
		<FavoriteContext.Provider
			value={{
				loading: state.loading,
				favorites: state.favorites,
				getFavorites,
				addFavorite,
				removeFavorite,
				clearFavorites,
			}}>
			{children}
		</FavoriteContext.Provider>
	);
};

export default FavoriteState;
