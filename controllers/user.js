const { UserModel } = require('../models/User');


const addOne = userData => {
	return UserModel.create(userData);
};

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

module.exports = {
	addOne,
	login,
};