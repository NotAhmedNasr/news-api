const NewsApi = require('newsapi');

const userActions = require('./user');

const { NEWS_API_KEYS } = process.env;

// More than one key used because of the requests limit on dev keys
const keysArray = NEWS_API_KEYS.split(',');
let currentKey = 0;

let news = new NewsApi(keysArray[currentKey]);

// Will be used to not infinitly call the function recursivly
// Rotating keys must stop if we rotated all keys for the same function call
let numberOfKeyRotations = 0;

const getNews = async (userId, page = 1, count = 10) => {
	const user = await userActions.getOne(userId);
	let results = Promise.resolve({ articles: [] });

	if (user && user.subscribtions.length > 0) {
		try {
			results = await news.v2.everything({
				sources: user.subscribtions.join(','),
				page: page,
				pageSize: count,
				sortby: 'publishedAt',
			});

		} catch (err) {
			if (err.name === 'NewsAPIError: rateLimited') {
				// this will terminate the function after trying all available keys
				if (numberOfKeyRotations >= keysArray.length)
					throw Error(err);

				// Rotate to another key if the current one exceeded the limit
				news = new NewsApi(keysArray[++currentKey % keysArray.length]);
				numberOfKeyRotations++;

				// Recursivly call the method to use the new key
				results = await getNews(userId, page, count);
			} else {
				throw Error(err);
			}
		} finally {
			numberOfKeyRotations = 0;
		}
	}

	return results;
};

const getSources = () => {
	return news.v2.sources({});
};


module.exports = {
	getNews,
	getSources,
};