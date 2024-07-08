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

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

console.log("Current directory:", process.cwd());
console.log("__dirname:", __dirname);
console.log("Contents of current directory:", fs.readdirSync(process.cwd()));

try {
	console.log(
		"Contents of backend directory:",
		fs.readdirSync(path.join(process.cwd(), "backend"))
	);
} catch (error) {
	console.error("Error reading backend directory:", error);
}

try {
	console.log(
		"Contents of frontend directory:",
		fs.readdirSync(path.join(process.cwd(), "frontend"))
	);
} catch (error) {
	console.error("Error reading frontend directory:", error);
}

// Serve static files from the 'frontend/public' directory
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "public", "index.html"));
});

// Serve dashboard.html for the /dashboard route
app.get("/dashboard", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "frontend", "public", "dashboard.html")
	);
});

// For single-page applications or other routes, serve index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "public", "index.html"));
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
