const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.create({ username, email, password });
		res.status(201).json({ token: generateToken(user._id) });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user && (await user.matchPassword(password))) {
			res.json({ token: generateToken(user._id) });
		} else {
			res.status(401).json({ error: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
