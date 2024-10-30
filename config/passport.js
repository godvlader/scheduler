const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
require("dotenv").config();

passport.use(
	new LinkedInStrategy(
		{
			clientID: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			callbackURL: process.env.LINKEDIN_REDIRECT_URI,
			scope: ["r_liteprofile", "w_member_social"], // Only include approved scopes
			state: true,
		},
		(accessToken, refreshToken, profile, done) => {
			// Handle LinkedIn response
		}
	)
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
