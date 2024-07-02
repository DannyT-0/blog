// backend/routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const user = new User({ username, email, password });
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const payload = { id: user.id, username: user.username };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.json({ token });
	})(req, res, next);
});

module.exports = router;
