import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [search, setSearch] = useState('');
	const [openSearch, setOpenSeach] = useState(false);
	const history = useHistory();
	const handleSearch = () => {
		history.push(`/search/${search}`);
		setOpenSeach(false);
		setSearch('');
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
					<button
						className='unBtn nav-link'
						onClick={(e) => setOpenSeach(!openSearch)}>
						Search
					</button>
					<button className='unBtn nav-link'>Categories</button>
					<button className='unBtn nav-link'>Login</button>
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
