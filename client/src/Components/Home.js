import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import LoginForm from './auth/LoginForm';
import RegistrationForm from './auth/RegistrationForm';
import Seo from './Seo';

const Home = () => {
	const [login, setAuthType] = useState(true);
	const { loginUser, isAuthenticated, registerUser } = useContext(authContext);
	if (isAuthenticated) {
		return <Redirect to='/trending' />;
	}
	return (
		<>
			<Seo
				lang={`en`}
				title={`Landing`}
				description={`Movie Partners Landing Page - The Watchlist App`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<div style={{ width: '100%' }}>
				<div className='home-bg'>
					<div className='home-overlay'></div>
					<h1 className='lead-text'>
						Movie <span className='pink-span'>Partners</span>
					</h1>
					<div className='home-content'>
						<div style={{ textAlign: 'center' }}>
							<p className='sub-lead'>
								<span className='pink-span'>Browse</span> Titles. Share{' '}
								<span className='pink-span'>Watchlists.</span>
							</p>
						</div>
						<div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
							<p className='description'>
								Because watchlists should be easy. And because sharing them
								should be easy too.
							</p>
						</div>
						{login ? (
							<LoginForm loginUser={loginUser} />
						) : (
							<RegistrationForm registerUser={registerUser} />
						)}

						<p className='register-text'>
							{login ? 'Need an Account? Register ' : 'Have an account? Login '}

							<button className='regBtn' onClick={(e) => setAuthType(!login)}>
								<span style={{ fontSize: '1.6rem' }} className='pink-span'>
									{' '}
									here!
								</span>
							</button>
						</p>
						<div className='lead-overlay'></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
