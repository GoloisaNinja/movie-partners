import React from 'react';
import loader from '../utils/mpLoader2.gif';

const Loading = () => {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
			}}>
			<img
				className='pugalicious'
				src={loader}
				alt='A loading gif of a cute dog running'
			/>
		</div>
	);
};
export default Loading;
