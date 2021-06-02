import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		favorites: [
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
				primary_genre: {
					type: String,
					required: true,
				},
			},
			{
				timestamps: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Favorite = mongoose.model('Favorite', FavoriteSchema);
export default Favorite;
