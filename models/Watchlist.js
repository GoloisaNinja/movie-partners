import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema(
	{
		user: {
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			avatar: {
				type: String,
				required: true,
			},
		},
		wl_name: {
			type: String,
			required: true,
		},
		titles: [
			{
				tmdb_id: {
					type: Number,
					required: true,
				},
				poster_path: {
					type: String,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				media_type: {
					type: String,
					required: true,
				},
			},
		],
		partners: [
			{
				partner_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				partner_name: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;
