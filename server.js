import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import user from './routes/user.js';
import profile from './routes/profile.js';
import watchlist from './routes/watchlist.js';
import favorite from './routes/favorite.js';
import watched from './routes/watched.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// create server
const app = express();

// connect to database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/watchlist', watchlist);
app.use('/api/favorite', favorite);
app.use('/api/watched', watched);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

// listen for server
app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
