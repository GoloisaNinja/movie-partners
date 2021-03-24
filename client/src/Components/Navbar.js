import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<>
			<nav className='navbar'>
				<div className='nav-start'>
					<Link style={{ padding: '0', margin: '0', height: '50px' }} to='/'>
						<img
							className='nav-logo'
							src='/assets/mp_logo.png'
							alt='movie partners logo'
						/>
					</Link>
				</div>
				<div className='nav-end'>
					<button className='btn nav-login'>Login</button>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
