import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import Watchlist from '../models/Watchlist.js';
import Title from '../models/Title.js';

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
	const {
		tmdb_id,
		title_name,
		status,
		overview,
		tagline,
		language,
		release_date,
		first_aired_date,
		run_time,
		avg_ep_run_time,
		num_episodes,
		num_seasons,
		networks,
		poster_path,
		media_type,
		genre_ids,
		vote_count,
		vote_average,
		available_services,
	} = req.body;
	const titleFields = {};
	titleFields.tmdb_id = tmdb_id;
	titleFields.title_name = title_name;
	titleFields.status = status;
	titleFields.overview = overview;
	titleFields.tagline = tagline;
	titleFields.language = language;
	titleFields.release_date = release_date || '';
	titleFields.first_aired_date = first_aired_date || '';
	titleFields.run_time = run_time || '';
	titleFields.avg_ep_run_time = avg_ep_run_time || '';
	titleFields.num_episodes = num_episodes || '';
	titleFields.num_seasons = num_seasons || '';
	if (networks) {
		titleFields.networks = networks;
	}
	titleFields.poster_path = poster_path;
	titleFields.media_type = media_type;
	titleFields.release_date = release_date;
	titleFields.genre_ids = genre_ids;
	titleFields.vote_count = vote_count;
	titleFields.vote_average = vote_average;
	if (available_services) {
		titleFields.available_services = available_services;
	}
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

		let title = await Title.findOne({ tmdb_id, media_type });
		if (!title) {
			title = new Title(titleFields);
			await title.save();
		}
		watchlist.titles.unshift({ title_id: title._id, tmdb_id });
		await watchlist.save();
		res.status(201).send({ title });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

export default router;
