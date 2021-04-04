import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import Watchlist from '../models/Watchlist.js';

// Get Watchlist by ID

router.get('/get/:id', async (req, res) => {
	//const user = await req.user;
	//const _id = user._id;
	const _id = req.params.id;
	try {
		const watchlist = await Watchlist.findById({ _id });
		if (!watchlist) {
			return res.status(404).send({ message: 'Could not find watchlist...' });
		}
		res.status(200).send(watchlist);
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

// Create new Watchlist

router.post('/', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const wl_name = req.body.name;
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		if (profile.watchlists.length > 0) {
			return profile.watchlists.forEach((list) => {
				if (list.name === wl_name) {
					return res
						.status(400)
						.send({ message: 'Watchlist with this name already exists...' });
				}
			});
		}
		const watchlist = new Watchlist({
			user: _id,
			wl_name,
		});
		await watchlist.save();
		profile.watchlists.unshift({ name: wl_name, wl_id: watchlist._id });
		await profile.save();
		res.status(201).send({ watchlist, profile });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

// Add a Title to Watchlist

router.post('/add/:id', auth, async (req, res) => {
	const user = await req.user;
	const watchlist_id = req.params.id;
	const _id = user._id;
	const { tmdb_id, poster_path, name, media_type } = req.body;
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const watchlist = await Watchlist.findOne({ user: _id, _id: watchlist_id });
		if (!watchlist) {
			return res
				.status(400)
				.send({ message: 'Request could not be completed...' });
		}
		if (watchlist.titles.length > 0) {
			const check = watchlist.titles.filter(
				(title) => title.tmdb_id === tmdb_id
			);
			if (check.length > 0) {
				return res
					.status(400)
					.send({ message: 'Title is already in your watchlist...' });
			}
		}
		watchlist.titles.unshift({ tmdb_id, poster_path, name, media_type });
		await watchlist.save();
		res.status(200).send({ watchlist });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

export default router;
