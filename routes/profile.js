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

// Get All User Profiles whom are discoverable

router.get('/all', auth, async (req, res) => {
	const user = await req.user;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
		const profiles = await Profile.find()
			.populate('user', ['name', 'avatar'])
			.populate('favorites', 'favorites')
			.populate('watched', 'watched')
			.where({ discoverable: true });
		if (!profiles) {
			return res.status(404).json({ message: 'No share profiles...' });
		}
		res.status(200).json(profiles);
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
	const { bio, genres, discoverable } = req.body;
	profileFields.user = _id;
	profileFields.bio = bio || '';
	profileFields.discoverable = discoverable;
	if (genres.length > 0) {
		profileFields.genres = genres;
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
