import React, { useEffect, useState, useCallback } from 'react';

const MediaServices = ({ providers }) => {
	const [flatrate, setFlatrate] = useState(null);
	const [buy, setBuy] = useState(null);
	const [rent, setRent] = useState(null);
	const manageProviders = useCallback(() => {
		if (providers.results.US.flatrate) {
			setFlatrate(providers.results.US.flatrate);
		}
		if (providers.results.US.buy) {
			setBuy(providers.results.US.buy);
		}
		if (providers.results.US.rent) {
			setRent(providers.results.US.rent);
		}
	}, [providers]);
	useEffect(() => {
		setTimeout(() => {
			manageProviders();
		}, 2000);
	}, [manageProviders]);
	return (
		<div className='providers-container'>
			<div>
				<p className='media-bottom-desc'>Where to Watch</p>
			</div>
			{flatrate && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Stream
					</small>
					<div className='buy-container'>
						{flatrate.map((provider) => (
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

			{buy && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Buy
					</small>
					<div className='buy-container'>
						{buy.map((provider) => (
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

			{rent && (
				<>
					<small style={{ fontSize: '1.6rem', color: '$secondary-text-color' }}>
						Rent
					</small>
					<div className='rent-container'>
						{rent.map((provider) => (
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
