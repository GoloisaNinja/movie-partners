import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';

// Get User Profile

router.get('/me', auth, async (req, res) => {
	const user = await req.user;
	const _id = req.user._id;
	let match = {};

	try {
		match = await Profile.findOne({ user: _id }).populate('user', [
			'name',
			'avatar',
		]);
		if (!match) {
			return res.status(404).json({ msg: 'Profile not found' });
		}
		res.json(match);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

// Create new Profile

router.post('/', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	let profileFields = {};
	const { bio, genres, favorites, partners, watchlists } = req.body;
	profileFields.user = _id;
	profileFields.bio = bio || '';
	if (genres) {
		profileFields.genres = genres
			.split(',')
			.map((genre) => parseInt(genre.trim()));
	}
	if (favorites) {
		profileFields.favorites = favorites
			.split(',')
			.map((favorite) => favorite.trim());
	}
	if (partners) {
		profileFields.partners = partners
			.split(',')
			.map((partner) => partner.trim());
	}
	if (watchlists) {
		profileFields.watchlists = watchlists
			.split(',')
			.map((watchlist) => watchlist.trim());
	}
	try {
		let profile = await Profile.findOne({ user: _id });
		if (profile) {
			profile = await Profile.findOneAndUpdate(
				{ user: _id },
				{ $set: profileFields },
				{ new: true }
			);
			return res.status(200).json(profile);
		}
		profile = new Profile(profileFields);
		await profile.save();
		res.status(201).json(profile);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

export default router;
