import React from 'react';

const CategoryBadge = ({ name, type }) => {
	const addedclass = ` ${name}-${type}`;
	return (
		<>
			<div className='badge-outer'>
				<div className={`badge-div${addedclass}`}></div>
				<div className='badge-overlay'></div>
				<p className='badge-name'>{name}</p>
			</div>
		</>
	);
};

export default CategoryBadge;
