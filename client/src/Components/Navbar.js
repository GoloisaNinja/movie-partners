import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [search, setSearch] = useState('');
	const [openSearch, setOpenSeach] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const history = useHistory();
	const handleSearch = () => {
		if (openSearch) {
			setOpenSeach(false);
		}
		if (menuOpen) {
			const overlay = document.getElementById('overlay');
			const menuBtn = document.getElementById('menu-button');
			menuBtn.classList.remove('open');
			setMenuOpen(false);
			overlay.classList.remove('active');
		}
		history.push(`/search/${search}`);
		setSearch('');
	};

	const handleHamburger = (e) => {
		const overlay = document.getElementById('overlay');
		const myBody = document.querySelector('body');
		const myHtml = document.querySelector('html');
		if (!menuOpen) {
			e.target.classList.add('open');
			setMenuOpen(true);
			overlay.classList.add('active');
			myBody.classList.add('menu-isopen');
			myHtml.classList.add('menu-isopen');
		} else {
			e.target.classList.remove('open');
			setMenuOpen(false);
			overlay.classList.remove('active');
			myBody.classList.remove('menu-isopen');
			myHtml.classList.remove('menu-isopen');
		}
	};

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
					<div
						className='menu-button'
						id='menu-button'
						onClick={(e) => handleHamburger(e)}>
						<div className='menu-button__burger' id='hamburger'></div>
					</div>
					<button
						className='unBtn nav-link'
						onClick={(e) => setOpenSeach(!openSearch)}>
						Search
					</button>
					<button className='unBtn nav-link'>Categories</button>
					<button className='unBtn nav-link'>Login</button>
				</div>
				<div className='menu-overlay' id='overlay'>
					<div className='menu-top'>
						<div className='logo-container'>
							<img src='/assets/mp_logo.png' alt='movie partners logo' />
						</div>

						<input
							className='nav-search__input'
							type='text'
							maxLength='30'
							id='search'
							name='search'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							className='menu-top__button'
							onClick={(e) => handleSearch()}>
							Search
						</button>
					</div>
					<div className='menu-bottom'>
						<ul className='menu-list'>
							<Link to='/'>
								<li>Watchlist</li>
							</Link>
							<Link to='/'>
								<li>Categories</li>
							</Link>
							<Link to='/'>
								<li>Profile</li>
							</Link>
							<Link to='/'>
								<li>Login</li>
							</Link>
						</ul>
					</div>
				</div>
			</nav>

			{openSearch && (
				<div className='nav-search'>
					<input
						className='nav-search__input'
						type='text'
						maxLength='30'
						id='search'
						name='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className='unBtn' onClick={(e) => handleSearch()}>
						<i className='search-btn fas fa-search'></i>
					</button>
				</div>
			)}
		</>
	);
};

export default Navbar;
