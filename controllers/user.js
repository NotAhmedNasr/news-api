const { UserModel } = require('../models/User');


const addOne = userData => {
	return UserModel.create(userData);
};


module.exports = {
	addOne,
};