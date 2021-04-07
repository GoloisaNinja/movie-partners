import mongoose from 'mongoose';

const WatchedSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		watched: [
			{
				tmdb_id: {
					type: Number,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				poster_path: {
					type: String,
					required: true,
				},
				media_type: {
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

const Watched = mongoose.model('Watched', WatchedSchema);
export default Watched;
