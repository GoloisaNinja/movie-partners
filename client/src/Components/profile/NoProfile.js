import React, { useState } from 'react';
import ProfileForm from './ProfileForm';

const NoProfile = () => {
	const [formOpen, setFormOpen] = useState(false);

	return (
		<div className='no-profile-container'>
			<p style={{ marginBottom: '1.5rem' }} className='profile-bio-desc'>
				Looks like you don't have a profile yet...
			</p>
			<p style={{ textAlign: 'center' }}>
				Making a profile takes seconds and allows you to:{' '}
			</p>
			<ul className='benefits-ul'>
				<li>
					<i className='genicon fas fa-check-circle'></i> Add Titles to your
					Favorites Collection!
				</li>
				<li>
					<i className='genicon fas fa-check-circle'></i> Create Watchlists and
					share them!
				</li>
				<li>
					<i className='genicon fas fa-check-circle'></i> Add Titles to your
					Watched Collection
				</li>
			</ul>
			<button
				className='btn profile-form-btn'
				onClick={(e) => setFormOpen(!formOpen)}>
				Profile Form
			</button>
			{formOpen && <ProfileForm />}
		</div>
	);
};

export default NoProfile;
