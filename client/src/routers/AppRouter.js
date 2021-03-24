import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../Components/Landing';
import Media from '../Components/media/Media';
import Navbar from '../Components/Navbar';

import WatchlistState from '../context/watchlist/WatchlistState';

const AppRouter = () => {
	return (
		<Router>
			<>
				<Navbar />
				<Switch>
					<WatchlistState>
						<Route exact path='/' component={Landing} />
						<Route path='/media/:id' component={Media} />
					</WatchlistState>
				</Switch>
			</>
		</Router>
	);
};

export default AppRouter;
