import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		bio: {
			type: String,
		},
		genres: [
			{
				genre_id: {
					type: Number,
					required: true,
				},
				genre_name: {
					type: String,
					required: true,
				},
				genre_type: {
					type: String,
					required: true,
				},
			},
		],
		favorites: [
			{
				title_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Title',
					required: true,
				},
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
		watched: [
			{
				title_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Title',
					required: true,
				},
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
		watchlists: [
			{
				name: {
					type: String,
					required: true,
				},
				wl_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Watchlist',
					required: true,
				},
			},
		],
		invites: [
			{
				sender_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				watchlist_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Watchlist',
					required: true,
				},
				watchlist_name: {
					type: String,
					required: true,
				},
				invite_text: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
