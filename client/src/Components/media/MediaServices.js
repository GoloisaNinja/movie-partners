import React from 'react';
const MediaServices = ({ providers }) => {
	return (
		<div className='providers-container'>
			<div>
				<p className='media-bottom-desc'>Where to Watch</p>
			</div>
			{providers.results.US.flatrate && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Stream
					</small>
					<div className='buy-container'>
						{providers.results.US.flatrate.map((provider) => (
							<img
								key={Math.random()}
								className='provider-logo'
								alt='provider logo'
								src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
							/>
						))}
					</div>
				</>
			)}

			{providers.results.US.buy && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Buy
					</small>
					<div className='buy-container'>
						{providers.results.US.buy.map((provider) => (
							<img
								key={Math.random()}
								className='provider-logo'
								alt='provider logo'
								src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
							/>
						))}
					</div>
				</>
			)}

			{providers.results.US.rent && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Rent
					</small>
					<div className='rent-container'>
						{providers.results.US.rent.map((provider) => (
							<img
								key={Math.random()}
								className='provider-logo'
								alt='provider logo'
								src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default MediaServices;
