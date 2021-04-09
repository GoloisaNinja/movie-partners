import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import Watchlist from '../models/Watchlist.js';

// Get all Watchlists

router.get('/allwatchlists', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		if (profile.watchlists.length < 0) {
			return res.status(404).send({ message: 'No watchlists...' });
		}
		const watchlistIds = profile.watchlists.map((watchlist) => watchlist.wl_id);
		const watchlists = await Watchlist.find({
			_id: { $in: watchlistIds },
		});
		res.status(200).send(watchlists);
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

// Get Watchlist by ID

router.get('/get/:id', auth, async (req, res) => {
	const user = await req.user;
	const _id = req.params.id;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
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

router.post('/create', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const wl_name = req.body.name;
	console.log(wl_name);
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		if (profile.watchlists.length > 0) {
			profile.watchlists.forEach(
				(list) =>
					list.name === wl_name &&
					res
						.status(400)
						.send({ message: 'Watchlist with that name already exists...' })
			);
		}
		const watchlist = new Watchlist({
			user: {
				_id,
				name: user.name,
				avatar: user.avatar,
			},
			wl_name,
		});
		await watchlist.save();
		profile.watchlists.unshift({ name: wl_name, wl_id: watchlist._id });
		await profile.save();
		res.status(201).send(watchlist);
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
		const watchlist = await Watchlist.findOne({
			'user._id': _id,
			_id: watchlist_id,
		});
		if (!watchlist) {
			return res
				.status(400)
				.send({ message: 'Request could not be completed...' });
		}
		if (watchlist.titles.length > 0) {
			const check = watchlist.titles.filter(
				(title) => title.tmdb_id === tmdb_id && title.media_type === media_type
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

// Remove a Title to Watchlist

router.delete('/remove/:watchlist_id/:title_id', auth, async (req, res) => {
	const user = await req.user;
	const watchlist_id = req.params.watchlist_id;
	const title_id = req.params.title_id;
	const _id = user._id;
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const watchlist = await Watchlist.findOne({
			'user._id': _id,
			_id: watchlist_id,
		});
		if (!watchlist) {
			return res
				.status(400)
				.send({ message: 'Request could not be completed...' });
		}
		const index = watchlist.titles.findIndex(
			(title) => title.tmdb_id.toString() === title_id
		);
		if (index === -1) {
			return res.status(404).send({ message: 'Could not find title...' });
		}
		watchlist.titles.splice(index, 1);
		await watchlist.save();
		res.status(200).send({ message: 'Title successfully deleted...' });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

export default router;
