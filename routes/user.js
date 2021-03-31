import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import User from '../models/User.js';

// Create new User

router.post('/', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const avatar = await user.getAvatar();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		const errors = [];
		if (e) {
			for (const [key, { message }] of Object.entries(e.errors)) {
				errors.push(message);
			}
		}
		res.status(400).send(errors);
	}
});

// Load an Authenticated User

router.get('/auth', auth, async (req, res) => {
	const user = await req.user;
	try {
		if (user) {
			return res.status(200).json(user);
		} else {
			throw new Error('Please authenticate...');
		}
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

// Login a User

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		await user.save();
		res.status(200).send({ user, token });
	} catch (e) {
		res.status(401).send({ message: 'Login failed...' });
	}
});

// Logout a User

router.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.status(200).send({ message: 'User logged out' });
	} catch (e) {
		res.status(400).send({ message: e.message });
	}
});

export default router;
