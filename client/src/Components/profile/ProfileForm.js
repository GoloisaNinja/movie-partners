import React, { useState, useContext, useEffect } from 'react';
import profileContext from '../../context/profile/profileContext';
import { getCategoryGenres } from '../../Api/Api';

const ProfileForm = () => {
	const [bio, setBio] = useState('');
	const [discoverable, setDiscoverable] = useState(true);
	const [genres, setGenres] = useState({
		gen1M: { name: '' },
		gen2M: { name: '' },
		gen3M: { name: '' },
		gen1T: { name: '' },
		gen2T: { name: '' },
		gen3T: { name: '' },
	});
	const { gen1M, gen2M, gen3M, gen1T, gen2T, gen3T } = genres;
	const [movieGenres, setMovieGenres] = useState();
	const [tvGenres, setTvGenres] = useState();
	const { createProfile } = useContext(profileContext);

	useEffect(() => {
		const getResults = async () => {
			try {
				const movieGensResult = await getCategoryGenres('genre', 'movie');
				if (movieGensResult) {
					let myMovArr = movieGensResult;
					myMovArr.unshift({ id: Math.random(), name: 'Choose Movie Genre' });
					setMovieGenres(myMovArr);
				}
				const tvGensResult = await getCategoryGenres('genre', 'tv');
				if (tvGensResult) {
					let myTvArr = tvGensResult;
					myTvArr.unshift({ id: Math.random(), name: 'Choose Tv Genre' });
					setTvGenres(myTvArr);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getResults();
	}, []);

	const handleGenres = (e) => {
		const objArr = e.target.value.split(',');
		setGenres({
			...genres,
			[e.target.name]: {
				genre_id: parseInt(objArr[0]),
				genre_name: objArr[1],
				genre_type: objArr[2],
			},
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const profileFormData = {
			bio: bio.trim(),
			genres: [gen1M, gen2M, gen3M, gen1T, gen2T, gen3T],
			discoverable,
		};
		const movGensArr = profileFormData.genres.slice(0, 3);
		const tvGensArr = profileFormData.genres.slice(-3);
		let count = 0;
		let movDup = [];
		let tvDup = [];
		movGensArr.forEach((genre) =>
			movDup[genre.genre_id] ? count++ : (movDup[genre.genre_id] = true)
		);
		tvGensArr.forEach((genre) =>
			tvDup[genre.genre_id] ? count++ : (tvDup[genre.genre_id] = true)
		);
		profileFormData.genres.forEach((genre, index) => {
			if (genre.name === '') {
				alert(`Missing genre choice position ${index + 1}`);
				count++;
			}
		});
		if (count > 0) {
			alert('Please check that you have no duplicate or missing genres');
			return;
		} else {
			createProfile(profileFormData);
		}
	};
	useEffect(() => {
		if (movieGenres && tvGenres) {
			const position = document.getElementById('form-position');
			position.scrollIntoView();
		}
	}, [movieGenres, tvGenres]);
	return movieGenres && tvGenres ? (
		<form
			className='profile-form'
			id='form-position'
			onSubmit={(e) => handleSubmit(e)}>
			<div className='profile-form-group'>
				<label className='profile-label' htmlFor='bio'>
					Short Bio: Tell us about yourself...
				</label>
			</div>
			<div className='profile-form-group'>
				<textarea
					className='form-input'
					required
					minLength='30'
					placeholder='Movie lover that is really into dogs and lasers...'
					cols='30'
					rows='4'
					id='bio'
					name='bio'
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>
			</div>
			<div className='profile-form-group'>
				<label className='profile-label' htmlFor='gen1M'>
					Choose your 3 favorite movie genres
				</label>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen1M.name}
					className='form-select'
					name='gen1M'
					onChange={(e) => handleGenres(e)}>
					{movieGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},movie`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen2M.name}
					className='form-select'
					name='gen2M'
					onChange={(e) => handleGenres(e)}>
					{movieGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},movie`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen3M.name}
					className='form-select'
					name='gen3M'
					onChange={(e) => handleGenres(e)}>
					{movieGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},movie`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<label className='profile-label' htmlFor='gen1M'>
					Choose your 3 favorite tv genres
				</label>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen1T.name}
					className='form-select'
					name='gen1T'
					onChange={(e) => handleGenres(e)}>
					{tvGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},tv`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen2T.name}
					className='form-select'
					name='gen2T'
					onChange={(e) => handleGenres(e)}>
					{tvGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},tv`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<select
					value={gen3T.name}
					className='form-select'
					name='gen3T'
					onChange={(e) => handleGenres(e)}>
					{tvGenres.map((genre) => (
						<option key={genre.id} value={`${genre.id},${genre.name},tv`}>
							{genre.name}
						</option>
					))}
				</select>
			</div>
			<div className='profile-form-group'>
				<label className='profile-label' htmlFor='bio'>
					Allow profile discovery for watchlist invites!
				</label>
			</div>
			<div className='switch-field'>
				<input
					type='radio'
					id='radio-one'
					defaultChecked
					name='switch-one'
					value={discoverable}
					onClick={(e) => setDiscoverable(true)}
				/>
				<label htmlFor='radio-one'>Yes</label>
				<input
					type='radio'
					id='radio-two'
					name='switch-one'
					value={discoverable}
					onClick={(e) => setDiscoverable(false)}
				/>
				<label htmlFor='radio-two'>No</label>
			</div>
			<input
				className='btn profile-submit-btn'
				type='submit'
				value='Create Profile'
			/>
		</form>
	) : (
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
	);
};

export default ProfileForm;
