// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const protect = async (req, res, next) => {
// 	let token;
// 	if (
// 		req.headers.authorization &&
// 		req.headers.authorization.startsWith("Bearer")
// 	) {
// 		token = req.headers.authorization.split(" ")[1];
// 	}

// 	if (!token) {
// 		return res.status(401).json({ error: "Not authorized, no token" });
// 	}

// 	try {
// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		req.user = await User.findById(decoded.id).select("-password");

// 		if (!req.user) {
// 			return res.status(401).json({ error: "Not authorized, user not found" });
// 		}

// 		next();
// 	} catch (error) {
// 		console.error("Token verification failed", error);
// 		res.status(401).json({ error: "Not authorized, token failed" });
// 	}
// };

// module.exports = { protect };

// backend/middlewares/authMiddleware.js
const passport = require("passport");

const protect = passport.authenticate("jwt", { session: false });

module.exports = { protect };
