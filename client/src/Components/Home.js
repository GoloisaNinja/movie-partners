import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Home = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const { email, password } = formData;
	const { loginUser, isAuthenticated } = useContext(authContext);
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(email, password);
	};
	if (isAuthenticated) {
		return <Redirect to='/landing' />;
	}
	return (
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
							Because watchlists should be easy. And because sharing them should
							be easy too.
						</p>
					</div>

					<form className='form' onSubmit={(e) => handleSubmit(e)}>
						<div className='form-group'>
							<input
								className='float-input'
								id='email'
								name='email'
								type='email'
								required
								autoComplete='email'
								value={email}
								onChange={(e) => onChange(e)}
							/>
							<label htmlFor='email' className='float-label'>
								Email
							</label>
						</div>
						<div className='form-group'>
							<input
								className='float-input'
								id='password'
								name='password'
								required
								type='password'
								minLength='7'
								value={password}
								onChange={(e) => onChange(e)}
							/>
							<label htmlFor='password' className='float-label'>
								Password
							</label>
						</div>

						<input type='submit' value='Login' className='btn btn-formsub' />
					</form>
					<p className='register-text'>
						Need an Account? Register{' '}
						<Link to='/register'>
							<span className='pink-span'>here!</span>
						</Link>
					</p>
					<div className='lead-overlay'></div>
				</div>
			</div>
		</div>
	);
};

export default Home;
