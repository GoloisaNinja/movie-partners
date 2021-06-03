// Get visible watchlist titles based on filter criteria

const getVisibleWatchlistTitles = ({
	titles,
	watchlist: { textFilter, genreFilter, mediaFilter },
}) => {
	return titles.filter((title) => {
		if (genreFilter === '** Clear Filter **') {
			genreFilter = '';
		}
		let nameToMatch = '';
		if (title.title) {
			nameToMatch = title.title;
		} else {
			nameToMatch = title.name;
		}
		const textMatch = nameToMatch
			.toLowerCase()
			.includes(textFilter.toLowerCase());
		const genreMatch = title.primary_genre
			.toLowerCase()
			.includes(genreFilter.toLowerCase());
		let mediaMatch;
		if (mediaFilter === '') {
			mediaMatch = true;
		} else {
			mediaMatch = title.media_type.includes(mediaFilter);
		}
		return textMatch && genreMatch && mediaMatch;
	});
};

export default getVisibleWatchlistTitles;
