import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../Components/Landing';
import Media from '../Components/media/Media';
import Navbar from '../Components/Navbar';
import WatchlistState from '../context/watchlist/WatchlistState';
import Pages from '../Components/Pages';
import Search from '../Components/Search';

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
					</WatchlistState>
				</Switch>
			</>
		</Router>
	);
};

export default AppRouter;
