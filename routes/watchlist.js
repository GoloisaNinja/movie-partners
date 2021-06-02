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

// Invite a Watchlist

router.post('/invite/:watchlist_id/:user_id', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const watchlist_id = req.params.watchlist_id;
	const watchlist_name = req.body.watchlist_name;
	const inviteUser = req.params.user_id;
	const invite = {
		sender_id: _id,
		sender_name: user.name,
		sender_avatar: user.avatar,
		watchlist_id: watchlist_id,
		watchlist_name,
	};
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
		const profile = await Profile.findOne({ user: inviteUser });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const match = profile.watchlists.filter(
			(watchlist) => watchlist._id.toString() === watchlist_id
		);
		if (match.length > 0) {
			return res
				.status(400)
				.send({ message: 'User already has access to watchlist...' });
		}
		profile.invites.unshift(invite);
		await profile.save();
		res.status(201).send({ message: 'Invite successful...' });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

// Decline Invite to Watchlist

router.post('/decline/:invite_id', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const invite_id = req.params.invite_id;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const index = profile.invites.findIndex(
			(invite) => invite._id.toString() === invite_id
		);
		if (index === -1) {
			return res.status(404).send({ message: 'Could not find invite...' });
		}
		profile.invites.splice(index, 1);
		await profile.save();
		res.status(200).send({ message: 'Invite declined...' });
	} catch (e) {
		console.error(e);
		res.status(400).send({ message: e.message });
	}
});

// Accept Invite to Watchlist

router.post('/accept/:invite_id/:watchlist_id', auth, async (req, res) => {
	const user = await req.user;
	const _id = user._id;
	const invite_id = req.params.invite_id;
	const watchlist_id = req.params.watchlist_id;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
		const watchlist = await Watchlist.findById(watchlist_id);
		if (!watchlist) {
			return res.status(404).send({ message: 'Could not find watchlist...' });
		}
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const index = profile.invites.findIndex(
			(invite) => invite._id.toString() === invite_id
		);
		if (index === -1) {
			return res.status(404).send({ message: 'Could not find invite...' });
		}
		profile.watchlists.unshift({
			name: watchlist.wl_name,
			wl_id: watchlist._id,
		});
		profile.invites.splice(index, 1);
		await profile.save();
		watchlist.partners.unshift({ partner_id: _id, partner_name: user.name });
		await watchlist.save();
		res.status(200).send({ message: 'Invite accepted...' });
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
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		if (profile.watchlists.length > 0) {
			const match = profile.watchlists.filter(
				(watchlist) => watchlist.name === wl_name
			);
			if (match.length > 0) {
				return res
					.status(400)
					.send({ message: 'Watchlist with that name already exists...' });
			}
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

// Delete a Watchlist

router.delete('/delete/:id', auth, async (req, res) => {
	const user = await req.user;
	const _id = req.params.id;
	try {
		if (!user) {
			return res.status(401).send({ message: 'Please authenticate...' });
		}
		const profile = await Profile.findOne({ user: user._id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const index = profile.watchlists.findIndex(
			(watchlist) => watchlist.wl_id.toString() === _id
		);
		if (index === -1) {
			return res
				.status(404)
				.send({ message: 'Could not find watchlist in profile...' });
		}
		const watchlist = await Watchlist.findById({ _id });
		if (!watchlist) {
			return res.status(404).send({ message: 'Could not find watchlist...' });
		}
		if (watchlist.user._id.toString() === user._id.toString()) {
			watchlist.delete();
			profile.watchlists.splice(index, 1);
			await profile.save();
			return res.status(200).send({ message: 'Watchlist deleted' });
		} else {
			return res.status(401).send({ message: 'Unauthorized' });
		}
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
	const { tmdb_id, poster_path, name, media_type, primary_genre } = req.body;
	try {
		const profile = await Profile.findOne({ user: _id });
		if (!profile) {
			return res
				.status(404)
				.send({ message: 'Request could not be completed...' });
		}
		const watchlist = await Watchlist.findOne({
			_id: watchlist_id,
		});
		if (!watchlist) {
			return res
				.status(400)
				.send({ message: 'Request could not be completed...' });
		}
		const validPartner = watchlist.partners.filter(
			(partner) => partner.partner_id.toString() === _id.toString()
		);
		if (
			validPartner.length === 0 &&
			watchlist.user._id.toString() !== _id.toString()
		) {
			return res.status(401).send({ message: 'Unauthorized...' });
		}
		if (watchlist.titles.length > 0) {
			const check = watchlist.titles.filter(
				(title) =>
					title.tmdb_id.toString() === tmdb_id &&
					title.media_type === media_type
			);
			if (check.length > 0) {
				return res
					.status(400)
					.send({ message: 'Title is already in your watchlist...' });
			}
		}
		watchlist.titles.unshift({
			tmdb_id,
			poster_path,
			name,
			media_type,
			primary_genre,
		});
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
			_id: watchlist_id,
		});
		if (!watchlist) {
			return res
				.status(400)
				.send({ message: 'Request could not be completed...' });
		}
		const validPartner = watchlist.partners.filter(
			(partner) => partner.partner_id.toString() === _id.toString()
		);
		if (
			validPartner.length === 0 &&
			watchlist.user._id.toString() !== _id.toString()
		) {
			return res.status(401).send({ message: 'Unauthorized...' });
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
