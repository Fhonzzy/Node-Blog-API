const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		content: {
			type: String,
		},
		summary : {
			type: String,
		},
		cover: {
			type: String,
		},
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Post", postSchema);
