import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import Seo from '../Seo';
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
		<>
			<Seo
				lang={`en`}
				title={`Profile | ${user.name}`}
				description={`Movie Partners | Profile`}
				image={`https://www.wewatch.pw/assets/mp_logo.png`}
			/>
			<div className='container'>
				<ProfileTop user={user} logout={logoutUser} clear={clearProfile} />
				{profile ? <ProfileBottom profile={profile} /> : <NoProfile />}
			</div>
		</>
	);
};

export default Profile;
