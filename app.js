// backend/app.js
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

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

console.log("Current directory:", process.cwd());
console.log("__dirname:", __dirname);
console.log("Contents of current directory:", fs.readdirSync(process.cwd()));

// Try to read the public directory
try {
	console.log(
		"Contents of public directory:",
		fs.readdirSync(path.join(__dirname, "public"))
	);
} catch (error) {
	console.error("Error reading public directory:", error);
}

// Serve index.html for the root route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve dashboard.html for the /dashboard route
app.get("/dashboard", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

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
