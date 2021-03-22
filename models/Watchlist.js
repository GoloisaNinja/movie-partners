import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		wl_name: {
			type: String,
			required: true,
		},
		titles: [
			{
				title_id: {
					type: String,
					required: true,
				},
				tmdb_id: {
					type: Number,
					required: true,
				},
			},
		],
		partners: {
			type: [String],
			default: undefined,
		},
	},
	{
		timestamps: true,
	}
);

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;
