import React from 'react';

const Footer = () => {
	const date = new Date();
	const currentYear = date.getFullYear();
	return (
		<footer className='footer'>
			<div className='footer-main'>
				<p>
					Movie Partners was designed and built by{' '}
					<a href='https://jcodes.page'>
						<span
							className='pink-span'
							style={{
								fontFamily: 'sans-serif',
								fontSize: '1rem',
								fontWeight: 900,
							}}>
							<strong>Jon Collins</strong>
						</span>
					</a>{' '}
					for his beautiful wifey Lou Lou.
				</p>
			</div>
			<div className='footer-main'>
				<p>Movie Partners is powered by The Movie Database.</p>
				<img src='/assets/tmdb.jpg' alt='tmdb-logo' className='footer-tmdb' />
			</div>

			<div className='footer-bottom'>
				<p>
					Movie Partners App{' '}
					<span
						className='green-span'
						style={{
							fontFamily: 'sans-serif',
							fontSize: '1rem',
							fontWeight: 900,
						}}>
						{' '}
						<strong>{currentYear}</strong>
					</span>
				</p>
				<img
					src='/assets/mp_logoPurple.png'
					alt='logo'
					className='footer-logo'
				/>
			</div>
		</footer>
	);
};

export default Footer;
