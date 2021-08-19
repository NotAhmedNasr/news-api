const NewsApi = require('newsapi');

const userActions = require('./user');

const news = new NewsApi('c45cc42f53c14d9bbce83e10dc50fd10');


const getAll = async (userId, page, count) => {
	const user = await userActions.getOne(userId);

	return news.v2.everything({
		q: 'trump',
		sources: user.subscribtions.join(','),
		language: 'en',
		page: page,
		pageSize: count | 20,
		sortby: 'publishedAt',
	});
};

const getSources = () => {
	return news.v2.sources({

	});
};

module.exports = { 
	getAll,
	getSources,
};