const { UserModel } = require('../models/User');


const addOne = userData => {
	return UserModel.create(userData);
};

const getOne = userId => UserModel.findById(userId).exec();

const login = async ({email, password}) => {
	const user = await UserModel.findOne({email}).exec();

	if (user)
		if(await user.isValidPassword(password))
			return user;
		else
			throw new Error('password');
	else
		throw new Error('username');
};

const subscribe = (userId, sourceId) => {
	return UserModel.findByIdAndUpdate(userId, {$addToSet: {subscribtions: sourceId}}, {new: true}).exec();
};

const unsubscribe = (userId, sourceId) => {
	return UserModel.findByIdAndUpdate(userId, {$pull: {subscribtions: sourceId}}, {new: true}).exec();
};

module.exports = {
	addOne,
	login,
	getOne,
	subscribe,
	unsubscribe,
};