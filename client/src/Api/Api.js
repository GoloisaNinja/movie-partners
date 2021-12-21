import instance from '../utils/CorsInstance';
const apiKey = process.env.REACT_APP_TMDB_APIKEY;
const baseURL = 'https://api.themoviedb.org/3';

export async function getTrending(endpoint, type, page) {
	if (page === undefined) {
		page = '1';
	}
	const response = await instance.get(
		`${baseURL}/${endpoint}/${type}/week?page=${page}&api_key=${apiKey}`
	);
	return {
		media_results: response.data.results,
		total_pages: response.data.total_pages,
	};
}

export async function getCategoryGenres(endpoint, type) {
	const response = await instance.get(
		`${baseURL}/${endpoint}/${type}/list?api_key=${apiKey}&language=en-US`
	);
	return response.data.genres;
}

export async function getCategoryGenreTitles(
	endpoint,
	type,
	sortBy,
	page,
	genreId
) {
	const response = await instance.get(
		`${baseURL}/${endpoint}/${type}?api_key=${apiKey}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
	);
	return {
		media_results: response.data.results,
		total_pages: response.data.total_pages,
	};
}

export async function getMedia(type, media_id) {
	const response = await instance.get(
		`${baseURL}/${type}/${media_id}?api_key=${apiKey}&language=en-US&append_to_response=videos`
	);
	return response.data;
}

export async function getRelatedMedia(type, media_id) {
	const response = await instance.get(
		`${baseURL}/${type}/${media_id}/similar?api_key=${apiKey}&language=en-US&page=1`
	);
	return response.data;
}

export async function getMediaCredits(type, media_id) {
	const response = await instance.get(
		`${baseURL}/${type}/${media_id}/credits?api_key=${apiKey}`
	);
	return response.data;
}

export async function getMediaProviders(type, media_id) {
	const response = await instance.get(
		`${baseURL}/${type}/${media_id}/watch/providers?api_key=${apiKey}&language=en-US&append_to_response=videos`
	);
	return response.data;
}
