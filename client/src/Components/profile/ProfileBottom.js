import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileInvites from './ProfileInvites';

const ProfileBottom = ({ profile }) => {
	const [showInvites, setShowInvites] = useState(false);
	return (
		<div className='profile-details-container'>
			<div className='profile-bio'>
				<p className='profile-bio-desc'>Profile Bio</p>
				<p>
					<i className='tagQuote-left fas fa-quote-left'></i> {profile.bio}{' '}
					<i className='tagQuote-right fas fa-quote-right'></i>
				</p>
			</div>
			<div className='profile-genres'>
				<p className='profile-bio-desc'>Fave Movie Genres</p>
				<ul className='genre-ul'>
					{profile.genres.map(
						(genre) =>
							genre.genre_type === 'movie' && (
								<li key={genre.genre_id}>
									<i className='genicon fas fa-check-circle'></i>{' '}
									{genre.genre_name}
								</li>
							)
					)}
				</ul>
				<p style={{ marginTop: '2rem' }} className='profile-bio-desc'>
					Fave TV Genres
				</p>
				<ul className='genre-ul'>
					{profile.genres.map(
						(genre) =>
							genre.genre_type === 'tv' && (
								<li key={genre.genre_id}>
									<i className='genicon fas fa-check-circle'></i>{' '}
									{genre.genre_name}
								</li>
							)
					)}
				</ul>
			</div>
			<p style={{ marginBottom: '1.5rem' }} className='profile-bio-desc'>
				Profile Actions
			</p>
			<div className='profile-buttons-div'>
				<Link to='/favorites'>
					<button className='btn profBtn favorites-btn'>Favorites</button>
				</Link>
				<Link to='/watchlists'>
					<button className='btn profBtn watchlist-btn'>Watchlists</button>
				</Link>
				<Link to='/watched'>
					<button className='btn profBtn watched-btn'>Watched</button>
				</Link>
			</div>
			{profile.invites.length > 0 && (
				<>
					<p style={{ marginBottom: '1.5rem' }} className='profile-bio-desc'>
						You have invites!
					</p>
					<div className='profile-buttons-div'>
						<button
							className='btn profBtn invite-btn'
							onClick={(e) => setShowInvites(!showInvites)}>
							Invites ({profile.invites.length})
						</button>
					</div>
					{showInvites && <ProfileInvites invites={profile.invites} />}
				</>
			)}
		</div>
	);
};

export default ProfileBottom;
