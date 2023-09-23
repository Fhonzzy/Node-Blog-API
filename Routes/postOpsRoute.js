const express = require("express");
const router = express.Router();
const {
	getAllPost,
	getSinglePost,
	updatePost,
} = require("../controller/postOps");

router.get("/post", getAllPost);
router.get("/getpost/:id", getSinglePost);
router.put("/post", updatePost);

module.exports = router;
