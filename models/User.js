const mongoose = require('mongoose');
const { promisify } = require('util');
const { hash, compare } = require('bcryptjs');

const promisedHash = promisify(hash);

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
		trim: true,
		match: /^[a-zA-Z\s]+$/,
		minLength: 2,
		maxLength: 150,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	},
	password: {
		type: String,
		required: true,
		match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		maxLength: 500,
	},
	subscribtions: [String],
}, {
	toJSON: {
		transform: function (_doc, obj) {
			delete(obj.password);
			return obj;
		}
	}
});

userSchema.pre('save', function (next) {
	hashUserPassword(this, next);
});

userSchema.pre('findOneAndUpdate', function (next) {
	if (this._updated && this._updated.password) {
		hashUserPassword(this._updated, next);
	} else {
		next();
	}
});

const hashUserPassword = (user, next) => {
	promisedHash(user.password, 10)
		.then(res => {
			user.password = res;
			next();
		}).catch(err => next(err));
};

userSchema.methods.isValidPassword = function (password) {
	return compare(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = {
	UserModel,
};