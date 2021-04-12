import React from 'react';
import { useHistory } from 'react-router-dom';

const ProfileTop = ({ user, logout, clear }) => {
	const history = useHistory();
	const handleLogout = () => {
		logout(history);
		clear();
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
