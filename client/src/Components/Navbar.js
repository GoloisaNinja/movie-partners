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
			const myBody = document.querySelector('body');
			const myHtml = document.querySelector('html');
			menuBtn.classList.remove('open');
			setMenuOpen(false);
			overlay.classList.remove('active');
			myBody.classList.remove('menu-isopen');
			myHtml.classList.remove('menu-isopen');
		}
		history.push(`/search/${search}`);
		setSearch('');
	};

	const handleHamburger = () => {
		const menuBtn = document.getElementById('menu-button');
		const overlay = document.getElementById('overlay');
		const myBody = document.querySelector('body');
		const myHtml = document.querySelector('html');
		if (!menuOpen) {
			menuBtn.classList.add('open');
			setMenuOpen(true);
			overlay.classList.add('active');
			myBody.classList.add('menu-isopen');
			myHtml.classList.add('menu-isopen');
		} else {
			menuBtn.classList.remove('open');
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
						onClick={(e) => handleHamburger()}>
						<div className='menu-button__burger' id='hamburger'></div>
					</div>
					<button
						className='unBtn nav-link'
						onClick={(e) => setOpenSeach(!openSearch)}>
						Search
					</button>
					<button className='unBtn nav-link'>Watchlists</button>
					<Link to='/categories'>
						<button className='unBtn nav-link'>Categories</button>
					</Link>
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
								<button
									className='unBtn'
									style={{ color: '#ededed' }}
									onClick={(e) => handleHamburger()}>
									<li>Watchlists</li>
								</button>
							</Link>
							<Link to='/categories'>
								<button
									className='unBtn'
									style={{ color: '#ededed' }}
									onClick={(e) => handleHamburger()}>
									<li>Categories</li>
								</button>
							</Link>
							<Link to='/'>
								<button
									className='unBtn'
									style={{ color: '#ededed' }}
									onClick={(e) => handleHamburger()}>
									<li>Logout</li>
								</button>
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
