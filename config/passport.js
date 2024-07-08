// backend/config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const dotenv = require("dotenv");

dotenv.config();

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email });
				if (!user)
					return done(null, false, { message: "Invalid email or password" });

				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch)
					return done(null, false, { message: "Invalid email or password" });

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		async (payload, done) => {
			try {
				const user = await User.findById(payload.id);
				if (!user) return done(null, false);

				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

module.exports = passport;
