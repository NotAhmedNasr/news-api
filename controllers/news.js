const NewsApi = require('newsapi');

const userActions = require('./user');

const news = new NewsApi('cace536443054b80b17f033f64bb9b3c');


const getAll = async (userId, page = 1, count = 10) => {
	const user = await userActions.getOne(userId);

	if (user.subscribtions.length > 0) {
		return news.v2.everything({
			q: 'trump',
			sources: user.subscribtions.join(','),
			language: 'en',
			page: page,
			pageSize: count,
			sortby: 'publishedAt',
		});
	}

	return Promise.resolve({articles: []});
};

const getSources = () => {
	return news.v2.sources({

	});
};

module.exports = { 
	getAll,
	getSources,
};