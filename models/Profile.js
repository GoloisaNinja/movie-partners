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
		genres: {
			type: [Number],
			default: undefined,
		},
		favorites: {
			type: [String],
			default: undefined,
		},
		partners: {
			type: [String],
			default: undefined,
		},
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
		requests: {
			type: [String],
			default: undefined,
		},
	},
	{
		timestamps: true,
	}
);

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
