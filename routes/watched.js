import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Watched from '../models/Watched.js';
import Profile from '../models/Profile.js';

// Get Watched Array

router.get('/', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	try {
		let watched = await Watched.findOne({ user: _id });
		if (!watched) {
			return res.status(404).json({ msg: 'Watched List not found' });
		}
		res.json(watched.watched);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

// Add title to Watched List

router.post('/add', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	let watchedFields = {};
	const { tmdb_id, name, poster_path, media_type } = req.body;
	watchedFields.tmdb_id = tmdb_id;
	watchedFields.name = name;
	watchedFields.poster_path = poster_path;
	watchedFields.media_type = media_type;
	try {
		const profile = await Profile.findOne({ user: _id });
		let watched = await Watched.findOne({ user: _id });
		if (watched) {
			const match = watched.watched.filter(
				(title) => title.tmdb_id === tmdb_id && title.media_type === media_type
			);
			if (match.length > 0) {
				return res
					.status(400)
					.send({ message: 'Title is already in watched...' });
			} else {
				watched.watched.unshift(watchedFields);
				await watched.save();
				return res.status(200).json(watched.watched[0]);
			}
		}
		watched = new Watched({ user: _id, watched: watchedFields });
		await watched.save();
		profile.watched = watched._id;
		await profile.save();
		res.status(201).json(watched.watched[0]);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

// Remove title from Watched

router.delete('/remove/:id', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const watchedId = req.params.id;
	try {
		let watched = await Watched.findOne({ user: _id });
		if (!watched) {
			return res
				.status(404)
				.send({ message: 'Could not find Watched collection...' });
		}
		const index = watched.watched.findIndex(
			(watched) => watched._id.toString() === watchedId
		);
		if (index === -1) {
			return res.status(404).send({ message: 'Could not find watched...' });
		}
		watched.watched.splice(index, 1);
		await watched.save();
		res.status(200).send({ message: 'Watched title successfully deleted...' });
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

export default router;
