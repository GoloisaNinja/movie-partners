import React, { useEffect, useContext, useState } from 'react';
import profileContext from '../../context/profile/profileContext';
import authContext from '../../context/auth/authContext';
import Modal from '../Modal';

const People = ({ location }) => {
	const wlId = location.state.id;
	const wlName = location.state.wl_name;
	const [show, setShow] = useState(false);
	const [content, setContent] = useState({
		title: '',
		body: '',
		icon: '/assets/mp_logo.png',
		type: 'dismiss',
	});
	const { profiles, getAllProfiles, inviteWatchlist } = useContext(
		profileContext
	);
	const { user } = useContext(authContext);
	useEffect(() => {
		getAllProfiles();
	}, []);
	const handleDismiss = () => {
		setShow(false);
	};
	const handleInvite = (userId, userName) => {
		inviteWatchlist(wlId, userId, wlName);
		setContent({
			...content,
			title: `Sent Invite to ${userName}!`,
			body: `Once ${userName} accepts your invite they will have full access to your watchlist!`,
		});
		setShow(true);
	};
	const profileEntries = profiles.map((profile) => {
		const match = profile.invites.filter(
			(invite) => invite.watchlist_id === wlId
		);
		if (profile.user._id !== user._id && match.length === 0) {
			return (
				<tr key={profile._id}>
					<td>
						<img
							className='people-table-avatar'
							src={profile.user.avatar}
							alt='avatar'
						/>
					</td>
					<td>{profile.user.name}</td>
					<td>{profile.watched ? profile.watched.watched.length : 0}</td>
					<td>{profile.favorites ? profile.favorites.favorites.length : 0}</td>
					<td>
						<button
							className='btn people-invite-btn'
							onClick={(e) =>
								handleInvite(profile.user._id, profile.user.name)
							}>
							Invite
						</button>
					</td>
				</tr>
			);
		}
	});

	return profiles.length > 0 ? (
		<div className='container'>
			<div className='profile-branding'>
				<h2>
					Movie <span className='pink-span'>Partners </span>Invite{' '}
					<span className='pink-span'>
						<i className='fas fa-share-square'></i>
					</span>
				</h2>
			</div>
			<table className='people-table'>
				<thead>
					<tr>
						<th>user</th>
						<th>name</th>
						<th>
							<i className='peopleWatched fas fa-eye'></i>
						</th>
						<th>
							<i className='peopleFave fas fa-star'></i>
						</th>
						<th />
					</tr>
				</thead>
				<tbody>{profileEntries}</tbody>
			</table>
			<Modal show={show} handleDismiss={handleDismiss} content={content} />
		</div>
	) : (
		<div className='container'>
			No one to share watchlists with at the moment...
		</div>
	);
};

export default People;
