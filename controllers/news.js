const NewsApi = require('newsapi');

const userActions = require('./user');

const { NEWS_API_KEY } = process.env;

const news = new NewsApi(NEWS_API_KEY);

const getNews = async (userId, page = 1, count = 10) => {
	const user = await userActions.getOne(userId);

	if (user && user.subscribtions.length > 0) {
		return news.v2.everything({
			sources: user.subscribtions.join(','),
			page: page,
			pageSize: count,
			sortby: 'publishedAt',
		});
	}

	return Promise.resolve({ articles: [] });
};

const getSources = () => {
	return news.v2.sources({});
};

module.exports = {
	getNews,
	getSources,
};