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
		discoverable: {
			type: Boolean,
			required: true,
			default: false,
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
			{
				timestamps: true,
			},
		],
		favorites: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Favorite',
		},
		watched: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Watched',
		},
		invites: [
			{
				sender_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				sender_name: {
					type: String,
					required: true,
				},
				sender_avatar: {
					type: String,
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
			{
				timestamps: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
