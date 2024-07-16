const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://blog-production-e316.up.railway.app",
		],
		credentials: true,
	})
);
app.use(express.json());
app.use(passport.initialize());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Logging for debugging
console.log("Current directory:", process.cwd());
console.log("__dirname:", __dirname);
console.log("Contents of current directory:", fs.readdirSync(process.cwd()));

try {
	console.log(
		"Contents of public directory:",
		fs.readdirSync(path.join(__dirname, "public"))
	);
} catch (error) {
	console.error("Error reading public directory:", error);
}

// Catch-all route for SPA
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"), (err) => {
		if (err) {
			console.error("Error sending file:", err);
			res.status(500).send("Error loading page");
		}
	});
});

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	)
	.catch((error) => console.log(error.message));
