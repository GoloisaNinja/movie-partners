// Get visible watchlist titles based on filter criteria

const getVisibleWatchlistTitles = (titles, text) => {
	console.log(titles);
	console.log(text);
	return titles.filter((title) => {
		let nameToMatch = '';
		if (title.title) {
			nameToMatch = title.title;
		} else {
			nameToMatch = title.name;
		}
		return nameToMatch.toLowerCase().includes(text.toLowerCase());
	});
};

export default getVisibleWatchlistTitles;
