const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const register = async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (error) {
		console.log(error.message);
	}
};

const logIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ msg: "User Doesn't Exist" });
		}

		const checkPassword = await user.comparePasswords(password);

		if (!checkPassword) {
			return res.status(401).json({ msg: "Invalid Password" });
		}

		const token = user.createJWT();

		res.cookie("token", token).json({
			id: user._id,
			username: user.username,
		});
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const profile = (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
		// if (err) {
		// 	throw err.message;
		// }
		res.json(info);
	});
};

const logout = (req, res) => {
	res.cookie("token", "").json({ msg: "token removed" });
};

module.exports = {
	register,
	logIn,
	profile,
	logout,
};
