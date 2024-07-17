const passport = require("passport");

const protect = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		if (err) {
			console.error("Auth error:", err);
			return next(err);
		}
		if (!user) {
			console.error("Auth failed:", info);
			return res.status(401).json({ message: "Unauthorized", details: info });
		}
		req.user = user;
		next();
	})(req, res, next);
};

module.exports = { protect };
