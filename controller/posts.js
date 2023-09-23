const fs = require("fs");
const Post = require("../Models/Post");
const jwt = require("jsonwebtoken");

const post = async (req, res) => {
	const { originalname, path } = req.file;
	const splitOriginalname = originalname.split(".");
	const ext = splitOriginalname[splitOriginalname.length - 1];
	const newPath = path + "." + ext;
	fs.renameSync(path, newPath);

	const { token } = req.cookies;
	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
		if (err) {
			throw err.message;
		}

		const { title, content, summary } = req.body;
		const postDoc = await Post.create({
			title,
			content,
			summary,
			cover: newPath,
			author: info.userId,
		});

		res.json(postDoc);
	});
};


module.exports = {
	post,
};
