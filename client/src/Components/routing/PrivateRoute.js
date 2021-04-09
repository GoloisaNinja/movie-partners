import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loading, isAuthenticated } = useContext(authContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					<div
						style={{
							minHeight: '100vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
						}}></div>
				) : isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
};

export default PrivateRoute;
