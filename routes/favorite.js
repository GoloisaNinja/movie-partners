import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Favorite from '../models/Favorite.js';

// Get Favorites Array

router.get('/', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	try {
		let favorite = await Favorite.findOne({ user: _id });
		if (!favorite) {
			return res.status(404).json({ msg: 'Favorites not found' });
		}
		res.json(favorite.favorites);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

// Add title to Favorites

router.post('/add', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	let favoriteFields = {};
	const { tmdb_id, name, poster_path, media_type } = req.body;
	favoriteFields.tmdb_id = tmdb_id;
	favoriteFields.name = name;
	favoriteFields.poster_path = poster_path;
	favoriteFields.media_type = media_type;
	try {
		let favorite = await Favorite.findOne({ user: _id });
		if (favorite) {
			favorite.favorites.unshift(favoriteFields);
			await favorite.save();
			return res.status(200).json(favorite.favorites[0]);
		}
		favorite = new Favorite({ user: _id, favorites: favoriteFields });
		await favorite.save();
		res.status(201).json(favorite.favorites[0]);
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

// Remove title from Favorites

router.delete('/remove/:id', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const favoriteId = req.params.id;
	try {
		let favorite = await Favorite.findOne({ user: _id });
		if (!favorite) {
			return res
				.status(404)
				.send({ message: 'Could not find favorite collection...' });
		}
		const index = favorite.favorites.findIndex(
			(favorite) => favorite._id.toString() === favoriteId
		);
		if (index === -1) {
			return res.status(404).send({ message: 'Could not find favorite...' });
		}
		favorite.favorites.splice(index, 1);
		await favorite.save();
		res.status(200).send({ message: 'Favorite successfully deleted...' });
	} catch (e) {
		console.error(e);
		res.status(500).send(e.message);
	}
});

export default router;
