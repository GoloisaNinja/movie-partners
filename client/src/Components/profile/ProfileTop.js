import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import watchlistContext from '../../context/watchlist/watchlistContext';
import { useHistory } from 'react-router-dom';

const ProfileTop = ({ user }) => {
	const { logoutUser } = useContext(authContext);
	const { clearProfile } = useContext(profileContext);
	const { clearWatchlistState } = useContext(watchlistContext);
	const history = useHistory();
	const handleLogout = async () => {
		await clearProfile();
		await clearWatchlistState();
		logoutUser(history);
	};
	return (
		<>
			<div className='profile-branding'>
				<h2>
					Movie{' '}
					<span className='pink-span'>
						<strong>Partners</strong>{' '}
					</span>
					Profile{' '}
					<span className='pink-span'>
						<i className='fas fa-user'></i>
					</span>
				</h2>
			</div>
			<div className='profile-avatar-container'>
				{user && (
					<>
						<img className='profile-avatar' src={user.avatar} alt='avatar' />
						<h3 style={{ textTransform: 'uppercase' }}>{user.name}</h3>
					</>
				)}

				<button className='btn profile-logout' onClick={(e) => handleLogout()}>
					Logout
				</button>
			</div>
		</>
	);
};

export default ProfileTop;
