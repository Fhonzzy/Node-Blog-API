const Post = require("../Models/Post");
const jwt = require("jsonwebtoken");
const getAllPost = async (req, res) => {
	try {
		const post = await Post.find()
			.populate("author", "username")
			.sort({ createdAt: -1 });
		res.json(post);
	} catch (error) {
		console.log(error.message);
	}
};

const getSinglePost = async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Post.findOne({ _id: id }).populate("author", "username");
		res.json(post);
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const updatePost = async (req, res) => {
	res.json({test:4})
};

module.exports = {
	getAllPost,
	getSinglePost,
	updatePost,
};
