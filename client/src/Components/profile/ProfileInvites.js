import React, { useContext } from 'react';
import profileContext from '../../context/profile/profileContext';

const ProfileInvites = ({ invites }) => {
	const { acceptInvite, declineInvite } = useContext(profileContext);
	const handleAccept = (inviteId, watchlistId) => {
		acceptInvite(inviteId, watchlistId);
	};
	const handleDecline = (id) => {
		declineInvite(id);
	};
	const inviteEntries = invites.map((invite) => (
		<tr key={invite._id}>
			<td id='hide-sm'>
				<img
					className='people-table-avatar'
					src={invite.sender_avatar}
					alt='avatar'
				/>
			</td>
			<td>{invite.sender_name}</td>
			<td>{invite.watchlist_name}</td>
			<td>
				<button
					className='btn accept people-invite-btn'
					onClick={(e) => handleAccept(invite._id, invite.watchlist_id)}>
					<i className='fas fa-check'></i>
				</button>
			</td>
			<td>
				<button
					className='btn dismiss people-invite-btn'
					onClick={(e) => handleDecline(invite._id)}>
					<i className='fas fa-times'></i>
				</button>
			</td>
		</tr>
	));
	return (
		<div style={{ width: '100%', margin: '0 auto' }}>
			<table style={{ width: '100%', margin: '0 auto' }}>
				<thead>
					<tr>
						<th id='hide-sm'>user</th>
						<th>from</th>
						<th>watchlist name</th>
						<th />
						<th />
					</tr>
				</thead>
				<tbody>{inviteEntries}</tbody>
			</table>
		</div>
	);
};

export default ProfileInvites;
