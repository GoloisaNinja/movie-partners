import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Routing Needs - Private Route
import PrivateRoute from '../Components/routing/PrivateRoute';

// Components
import Trending from '../Components/trending/Trending';
import Media from '../Components/media/Media';
import Navbar from '../Components/Navbar';
import Pages from '../Components/trending/Pages';
import Search from '../Components/search/Search';
import Categories from '../Components/categories/Categories';
import Category from '../Components/categories/Category';
import Home from '../Components/Home';
import Profile from '../Components/profile/Profile';
import Favorites from '../Components/favorites/Favorites';
import Watched from '../Components/watched/Watched';
import Watchlists from '../Components/watchlists/Watchlists';
import Watchlist from '../Components/watchlists/Watchlist';
import People from '../Components/people/People';

// Contexts and States
import WatchlistState from '../context/watchlist/WatchlistState';
import ProfileState from '../context/profile/ProfileState';
import FavoriteState from '../context/favorite/FavoriteState';
import WatchedState from '../context/watched/WatchedState';

// Utils
import axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';

// Imports for initial User state
import AuthContext from '../context/auth/authContext';
import authReducer from '../context/auth/authReducer';
import {
	REGISTER_FAILURE,
	REGISTER_SUCCESS,
	LOAD_USER,
	LOAD_FAILURE,
	LOGIN_USER,
	LOGIN_FAILURE,
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
			dispatch({
				type: LOGIN_FAILURE,
			});
			console.log(e.message);
			alert(e.message);
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
			dispatch({
				type: LOAD_FAILURE,
			});
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
					<ProfileState>
						<WatchlistState>
							<Navbar />
							<Switch>
								<Route exact path='/' component={Home} />
								<Route path='/trending' component={Trending} />

								<Route path='/pages/:media_id/:page' component={Pages} />
								<Route path='/search/:search_string' component={Search} />
								<Route exact path='/categories' component={Categories} />
								<Route
									path='/categories/:media_id/:genre_id/:genre_name/:page'
									component={Category}
								/>

								<FavoriteState>
									<WatchedState>
										<Route path='/media/:id' component={Media} />
										<PrivateRoute exact path='/profile' component={Profile} />
										<PrivateRoute path='/favorites' component={Favorites} />
										<PrivateRoute path='/watched' component={Watched} />
										<PrivateRoute
											exact
											path='/watchlists'
											component={Watchlists}
										/>
										<PrivateRoute
											path='/watchlists/:watchlist_id'
											component={Watchlist}
										/>
										<PrivateRoute path='/people' component={People} />
									</WatchedState>
								</FavoriteState>
							</Switch>
						</WatchlistState>
					</ProfileState>
				</>
			</Router>
		</AuthContext.Provider>
	);
};

export default AppRouter;
