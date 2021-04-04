import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Trending from '../Components/trending/Trending';
import Media from '../Components/media/Media';
import Navbar from '../Components/Navbar';
import WatchlistState from '../context/watchlist/WatchlistState';
//import AuthState from '../context/auth/AuthState';
import Pages from '../Components/trending/Pages';
import Search from '../Components/search/Search';
import Categories from '../Components/categories/Categories';
import Category from '../Components/categories/Category';
import Home from '../Components/Home';
import axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';

// Imports for initial User state
import AuthContext from '../context/auth/authContext';
import authReducer from '../context/auth/authReducer';
import {
	REGISTER_FAILURE,
	REGISTER_SUCCESS,
	LOAD_USER,
	LOGIN_USER,
	LOGOUT_USER,
} from '../context/auth/authActions';

const AppRouter = () => {
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
				SetAuthToken(res.data.token);
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
				SetAuthToken(res.data.token);
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	// Logout a User

	const logoutUser = async (history) => {
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
				localStorage.removeItem('token');
			}
			history.push('/');
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
			const res = await axios.get('/api/user/auth');
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

	if (localStorage.token) {
		SetAuthToken(localStorage.token);
	}
	useEffect(() => {
		loadUser();
	}, []);

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
			<Router>
				<>
					<Navbar />
					<Switch>
						<WatchlistState>
							<Route exact path='/' component={Home} />
							<Route path='/trending' component={Trending} />
							<Route path='/media/:id' component={Media} />
							<Route path='/pages/:media_id/:page' component={Pages} />
							<Route path='/search/:search_string' component={Search} />
							<Route exact path='/categories' component={Categories} />
							<Route
								path='/categories/:media_id/:genre_id/:genre_name/:page'
								component={Category}
							/>
						</WatchlistState>
					</Switch>
				</>
			</Router>
		</AuthContext.Provider>
	);
};

export default AppRouter;
