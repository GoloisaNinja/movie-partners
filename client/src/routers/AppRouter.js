import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../Components/Landing';
import Media from '../Components/Media';

import WatchlistState from '../context/watchlist/WatchlistState';

const AppRouter = () => {
	return (
		<Router>
			<>
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
