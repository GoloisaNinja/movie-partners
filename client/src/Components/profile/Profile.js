import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import NoProfile from './NoProfile';

const Profile = () => {
	const { user, logoutUser } = useContext(authContext);
	const { profile, getProfile, clearProfile } = useContext(profileContext);
	useEffect(() => {
		getProfile();
	}, []);
	return (
		<div className='container'>
			<ProfileTop user={user} logout={logoutUser} clear={clearProfile} />
			{profile ? <ProfileBottom profile={profile} /> : <NoProfile />}
		</div>
	);
};

export default Profile;
