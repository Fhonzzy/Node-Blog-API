require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port;
const connectDb = require("./db/connect");
const userRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
const postOpsRouter = require("./Routes/postOpsRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
	})
);
app.use(cookieParser());

app.use("/", userRouter);

app.use("/", uploadMiddleware.single("file"), postRouter);

app.use("/", uploadMiddleware.single("file"), postOpsRouter);

app.get("/", (req, res) => {
	res.send("Welcome to Node JS");
});

const startServer = () => {
	app.listen(port, async () => {
		try {
			await connectDb(process.env.MONGO_URI);
			console.log(`Server is listening on port ${port}...`);
		} catch (error) {
			console.log(error.message);
		}
	});
};

startServer();
