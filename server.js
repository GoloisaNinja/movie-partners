import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import user from './routes/user.js';
import profile from './routes/profile.js';
import watchlist from './routes/watchlist.js';

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

// listen for server
app.listen(5000, () => console.log('Server is up on port 5000'));
