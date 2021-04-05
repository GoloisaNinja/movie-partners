import React from 'react';

const MediaButtons = ({ values }) => {
	return (
		<div className='profile-buttons'>
			<button className='btn favorites-btn'>{values.fave}</button>
			<button className='btn watchlist-btn'>{values.list}</button>
			<button className='btn watched-btn'>{values.watch}</button>
		</div>
	);
};

export default MediaButtons;
