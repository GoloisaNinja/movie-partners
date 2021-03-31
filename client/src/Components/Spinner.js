import React from 'react';
import loader from '../layout/movie.gif';

const Spinner = () => {
	return (
		<div className='container'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '80vh',
				}}>
				<img
					style={{ maxWidth: '125px', margin: '0 auto', display: 'block' }}
					src={loader}
					alt='loading...'
				/>
			</div>
		</div>
	);
};

export default Spinner;
