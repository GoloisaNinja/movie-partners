import React, { useState, useEffect, useContext } from 'react';
import { getMediaProviders } from '../../Api/Api';
import { Link } from 'react-router-dom';
import MediaButtons from './MediaButtons';
import MediaGenres from './MediaGenres';
import MediaCast from './MediaCast';
import MediaServices from './MediaServices';
import profileContext from '../../context/profile/profileContext';
import authContext from '../../context/auth/authContext';

const MediaBottom = ({ media, type, media_id, credits }) => {
	const [providers, setProviders] = useState({});
	const { profile } = useContext(profileContext);
	const { user } = useContext(authContext);

	let fetchProvidersRequest = null;
	const userTextObj = {
		p: "Looks like you don't have a profile yet. Making a profile take just a few seconds and will let you add titles to your favorites and watched collections and also create custom Watchlists that you can share! ",
		l: 'Click here to Create Profile',
		a: '/profile',
	};

	const nonUserTextObj = {
		p: "Looks like you don't have a account. Register for an account and create your profile to add titles to your favorites and watched collections and even create and share custom Watchlists! ",
		l: 'Click here to Register Now',
		a: '/',
	};

	const NoProfileComponent = ({ obj }) => {
		return (
			<>
				<div style={{ width: '85%', margin: '0 auto', marginBottom: '2rem' }}>
					<p className='media-bottom-desc'>Profile Actions</p>
					<p style={{ fontSize: '1.8rem' }}>
						{obj.p}
						<Link style={{ fontSize: '1.8rem', color: '#ff45e9' }} to={obj.a}>
							{obj.l}
						</Link>{' '}
						for free!
					</p>
				</div>
			</>
		);
	};

	const makeCancelable = (promise) => {
		let isCancelled = false;
		const wrappedPromise = new Promise((resolve, reject) => {
			promise.then(
				(val) => (isCancelled ? reject({ isCancelled: true }) : resolve(val)),
				(error) => (isCancelled ? reject({ isCancelled: true }) : reject(error))
			);
		});
		return {
			promise: wrappedPromise,
			cancel() {
				isCancelled = true;
			},
		};
	};

	useEffect(() => {
		let attempts = 0;
		const getProviders = async () => {
			if (fetchProvidersRequest) {
				try {
					await fetchProvidersRequest.promise;
					return;
				} catch (error) {
					return;
				}
			}
			fetchProvidersRequest = makeCancelable(getMediaProviders(type, media_id));
			try {
				const fetchedProviders = await fetchProvidersRequest.promise;
				fetchProvidersRequest = null;
				if (
					Object.keys(fetchedProviders.results).length !== 0 &&
					!fetchedProviders.isCancelled
				) {
					setProviders(fetchedProviders);
				} else if (
					Object.keys(fetchedProviders.results).length === 0 &&
					!fetchedProviders.isCancelled
				) {
					setProviders({ results: 'none' });
				}
			} catch (error) {
				if (attempts < 4) {
					attempts++;
					console.log('attempting another request after failure...');
					getProviders();
				}
				console.log(error);
			}
		};

		getProviders();

		return () => {
			if (fetchProvidersRequest) {
				fetchProvidersRequest.cancel();
			}
		};
	}, [media_id, type]);
	return !providers.results ? (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
			}}>
			...
		</div>
	) : (
		<>
			<div className='container'>
				<div className='media-bottom-info'>
					{media.tagline !== '' && (
						<p className='media-bottom-tag'>
							<i className='tagQuote-left fas fa-quote-left'></i>{' '}
							{media.tagline}{' '}
							<i className='tagQuote-right fas fa-quote-right'></i>
						</p>
					)}

					<p className='media-bottom-desc'>Plot Overview</p>
					<p className='media-bottom-overview'>{media.overview}</p>
				</div>
				<MediaGenres genres={media.genres} />
				{credits.cast.length > 0 ? (
					<MediaCast cast={credits.cast} />
				) : (
					<div className='genre-container'>
						<p className='media-bottom-desc'>Cast</p>
						<p>this title has no associated cast...</p>
					</div>
				)}
				{providers.results.US ? (
					<MediaServices providers={providers} />
				) : (
					<div className='providers-container'>
						<div>
							<p className='media-bottom-desc'>Where to Watch</p>
							<p>this title has no associated providers or services...</p>
						</div>
					</div>
				)}
				{profile ? (
					<>
						<p className='media-bottom-desc'>Profile Actions</p>
						<MediaButtons media={media} type={type} />
					</>
				) : user ? (
					<NoProfileComponent obj={userTextObj} />
				) : (
					<NoProfileComponent obj={nonUserTextObj} />
				)}
				{media.videos.results.length !== 0 && (
					<>
						<p className='media-bottom-desc'>Videos and Trailers</p>
						<div className='media-bottom-iframe'>
							<iframe
								className='bottom-iframe'
								title={media.videos.results[0].id}
								src={`https://www.youtube.com/embed/${media.videos.results[0].key}`}></iframe>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default MediaBottom;
