const express = require("express");
const router = express.Router();
const { post} = require("../controller/posts");

router.post("/post", post);

module.exports = router;
