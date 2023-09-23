const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	email: {
        type: String,
        required: [true, "Please Provide Username"],
        unique: true,
    },
	username: {
		type: String,
		required: [true, "Please Provide Username"],
		minilength: 4,
	},
	password: {
		type: String,
		required: true,
		minilength: 4,
	},
});

UserSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.comparePasswords = async function (userPassword) {
	const isMatch = await bcrypt.compare(userPassword, this.password);
	return isMatch;
};

UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userId: this._id, username: this.username },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
