const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

const { JWT_SECRET } = process.env;

const generateToken = async (user) => {
	const token = await signAsync({
		data: {
			id: user._id,
		}
	}, JWT_SECRET, { expiresIn: '1d' });

	return {...(user.toJSON()), token};
};

const authorize = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const payload = await verifyAsync(authorization, JWT_SECRET);
		req.userId = payload.data.id;
		next();
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};

module.exports = {
	generateToken,
	authorize,
};