import React, { useContext, useEffect, useCallback } from 'react';
import authContext from '../../context/auth/authContext';
import profileContext from '../../context/profile/profileContext';
import Seo from '../Seo';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import NoProfile from './NoProfile';

const Profile = () => {
	const { user } = useContext(authContext);
	const { profile, getProfile } = useContext(profileContext);

	const memoizedProfile = useCallback(() => {
		getProfile();
	}, [getProfile]);

	useEffect(() => {}, [memoizedProfile, profile]);

	return (
		<>
			<Seo
				lang={`en`}
				title={`Profile page for ${user.name}`}
				description={`Your Profile Page`}
				image={`https://www.wewatch.pw/assets/mp_logoAlt3.png`}
			/>
			<div className='container'>
				<ProfileTop user={user} />
				{profile ? <ProfileBottom profile={profile} /> : <NoProfile />}
			</div>
		</>
	);
};

export default Profile;
