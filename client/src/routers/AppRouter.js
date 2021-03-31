import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../Components/trending/Landing';
import Media from '../Components/media/Media';
import Navbar from '../Components/Navbar';
import WatchlistState from '../context/watchlist/WatchlistState';
import Pages from '../Components/trending/Pages';
import Search from '../Components/search/Search';
import Categories from '../Components/categories/Categories';
import Category from '../Components/categories/Category';

const AppRouter = () => {
	return (
		<Router>
			<>
				<Navbar />
				<Switch>
					<WatchlistState>
						<Route exact path='/' component={Landing} />
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
	);
};

export default AppRouter;
