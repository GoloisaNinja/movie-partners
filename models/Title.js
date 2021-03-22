import mongoose from 'mongoose';

const TitleSchema = new mongoose.Schema(
	{
		tmdb_id: {
			type: Number,
			required: true,
		},
		title_name: {
			type: String,
			required: true,
		},
		overview: {
			type: String,
			required: true,
		},
		tagline: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		release_date: {
			type: String,
		},
		first_air_date: {
			type: String,
		},
		run_time: {
			type: Number,
		},
		avg_ep_run_time: {
			type: String,
		},
		num_episodes: {
			type: Number,
		},
		num_seasons: {
			type: Number,
		},
		networks: [
			{
				id: {
					type: Number,
				},
				logo_path: {
					type: String,
				},
				name: {
					type: String,
				},
				origin_country: {
					type: String,
				},
			},
		],
		poster_path: {
			type: String,
			required: true,
		},
		media_type: {
			type: String,
			required: true,
		},
		genre_ids: [
			{
				id: {
					type: Number,
				},
				name: {
					type: String,
				},
			},
		],
		available_services: [
			{
				rent: {
					display_priority: {
						type: Number,
					},
					logo_path: {
						type: String,
					},
					provider_id: {
						type: Number,
					},
					provider_name: {
						type: String,
					},
				},
				buy: {
					display_priority: {
						type: Number,
					},
					logo_path: {
						type: String,
					},
					provider_id: {
						type: Number,
					},
					provider_name: {
						type: String,
					},
				},
				flatrate: {
					display_priority: {
						type: Number,
					},
					logo_path: {
						type: String,
					},
					provider_id: {
						type: Number,
					},
					provider_name: {
						type: String,
					},
				},
			},
		],
		vote_average: {
			type: Number,
			required: true,
		},
		vote_count: {
			type: Number,
			required: true,
		},
		watch_order: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const Title = mongoose.model('Title', TitleSchema);
export default Title;
