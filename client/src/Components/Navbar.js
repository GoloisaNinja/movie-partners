import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authContext from '../context/auth/authContext';
import profileContext from '../context/profile/profileContext';
import watchlistContext from '../context/watchlist/watchlistContext';

const Navbar = () => {
	const [search, setSearch] = useState('');
	const [openSearch, setOpenSeach] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const history = useHistory();
	const { isAuthenticated, user, logoutUser } = useContext(authContext);
	const { activateWatchlist, watchlists, activatedWatchlist } =
		useContext(watchlistContext);
	const { clearProfile, getProfile, profile } = useContext(profileContext);

	useEffect(() => {
		if (localStorage.getItem('activatedWatchlist')) {
			activateWatchlist(localStorage.getItem('activatedWatchlist'));
		}
		console.log('checking for endless renders');
	}, [watchlists]);

	const handleSearch = (e) => {
		e.preventDefault();
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
			setTimeout(() => {
				myBody.classList.add('menu-isopen');
				myHtml.classList.add('menu-isopen');
			}, 600);
		} else {
			myBody.classList.remove('menu-isopen');
			myHtml.classList.remove('menu-isopen');
			menuBtn.classList.remove('open');
			setMenuOpen(false);
			overlay.classList.remove('active');
		}
	};

	const handleLogout = () => {
		handleHamburger();
		logoutUser(history);
		clearProfile();
	};

	useEffect(() => {
		const checkForProfile = async () => {
			await isAuthenticated;
			getProfile();
		};
		checkForProfile();
	}, [isAuthenticated]);

	const authLinks = (
		<>
			<div className='nav-start'>
				<Link
					style={{ padding: '0', margin: '0', height: '50px' }}
					to='/trending'>
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
				{profile !== null && (
					<Link to='/watchlists'>
						<button className='unBtn nav-link'>Watchlists</button>
					</Link>
				)}
				{profile !== null
					? activatedWatchlist && (
							<Link to={`/watchlists/${activatedWatchlist._id}`}>
								<button className='unBtn nav-link'>Active Watchlist</button>
							</Link>
					  )
					: null}
				<Link to='/categories'>
					<button className='unBtn nav-link'>Categories</button>
				</Link>
				<Link style={{ marginTop: '.3rem' }} to='/profile'>
					<img className='avatar' src={user && user.avatar} alt='avatar' />
				</Link>
			</div>
			<div className='menu-overlay' id='overlay'>
				<div className='menu-top'>
					<div className='logo-container'>
						<Link to='/profile'>
							<button className='unBtn' onClick={(e) => handleHamburger()}>
								<img
									style={{ borderRadius: '50%' }}
									src={user ? user.avatar : '/assets/mp_logo.png'}
									alt='avatar'
								/>
								<figcaption style={{ color: '#fff' }}>Go to Profile</figcaption>
							</button>
						</Link>
					</div>
					<form style={{ width: '100%' }} onSubmit={(e) => handleSearch(e)}>
						<input
							className='nav-search__input'
							type='text'
							maxLength='30'
							id='search'
							name='search'
							placeholder='Search for titles...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className='menu-top__button' type='submit' htmlFor='search'>
							Search
						</button>
					</form>
				</div>
				<div className='menu-bottom'>
					<ul className='menu-list'>
						{profile !== null && (
							<Link to='/watchlists'>
								<button
									className='unBtn'
									style={{ color: '#ededed' }}
									onClick={(e) => handleHamburger()}>
									<li>Watchlists</li>
								</button>
							</Link>
						)}
						{profile !== null
							? activatedWatchlist && (
									<Link to={`/watchlists/${activatedWatchlist._id}`}>
										<button
											className='unBtn'
											style={{ color: '#ededed' }}
											onClick={(e) => handleHamburger()}>
											<li>Active Watchlist</li>
										</button>
									</Link>
							  )
							: null}

						<Link to='/trending'>
							<button
								className='unBtn'
								style={{ color: '#ededed' }}
								onClick={(e) => handleHamburger()}>
								<li>Trending</li>
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

						<button
							className='unBtn'
							style={{ color: '#ededed' }}
							onClick={(e) => handleLogout()}>
							<li>Logout</li>
						</button>
					</ul>
				</div>
			</div>
		</>
	);
	const guestLinks = (
		<>
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
				<Link to='/trending'>
					<button className='unBtn nav-link'>Trending</button>
				</Link>
				<Link to='/categories'>
					<button className='unBtn nav-link'>Categories</button>
				</Link>
				<Link to='/'>
					<button className='unBtn nav-link'>Login</button>
				</Link>
			</div>
			<div className='menu-overlay' id='overlay'>
				<div className='menu-top'>
					<div className='logo-container'>
						<img src='/assets/mp_logo.png' alt='movie partners logo' />
					</div>
					<form style={{ width: '100%' }} onSubmit={(e) => handleSearch(e)}>
						<input
							className='nav-search__input'
							type='text'
							maxLength='30'
							id='search'
							name='search'
							placeholder='Search for titles...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className='menu-top__button' type='submit' htmlFor='search'>
							Search
						</button>
					</form>
				</div>
				<div className='menu-bottom'>
					<ul className='menu-list'>
						<Link to='/trending'>
							<button
								className='unBtn'
								style={{ color: '#ededed' }}
								onClick={(e) => handleHamburger()}>
								<li>Trending</li>
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
								<li>Login</li>
							</button>
						</Link>
					</ul>
				</div>
			</div>
		</>
	);

	return (
		<>
			<nav className='navbar'>{isAuthenticated ? authLinks : guestLinks}</nav>

			{openSearch && (
				<div className='nav-search'>
					<form style={{ width: '100%' }} onSubmit={(e) => handleSearch(e)}>
						<input
							className='nav-search__input'
							type='text'
							maxLength='30'
							id='search'
							name='search'
							placeholder='Search for titles...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className='unBtn' type='submit' htmlFor='search'>
							<i className='search-btn fas fa-search'></i>
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default Navbar;
