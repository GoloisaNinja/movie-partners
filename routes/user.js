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

export default router;
