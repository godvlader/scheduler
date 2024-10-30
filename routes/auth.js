const express = require("express");
const passport = require("passport");

const router = express.Router();

// LinkedIn authentication route
router.get(
	"/linkedin",
	passport.authenticate("linkedin") // Omitting scope
);

router.get("/auth/linkedin/callback", (req, res, next) => {
	passport.authenticate("linkedin", (err, user, info) => {
		if (err) {
			console.error("Error during LinkedIn OAuth callback:", err);
			return res.status(500).send("Error during LinkedIn OAuth callback");
		}
		if (!user) {
			console.error("User not found:", info);
			return res.status(401).send("User authentication failed");
		}
		req.login(user, (err) => {
			if (err) {
				console.error("Error logging in user:", err);
				return res.status(500).send("Error logging in user");
			}
			return res.redirect("/dashboard"); // Redirect to your desired route after login
		});
	})(req, res, next);
});

// LinkedIn callback route
router.get(
	"/linkedin/callback",
	passport.authenticate("linkedin"),
	(req, res) => {
		req.session.accessToken = req.user.accessToken;
		res.redirect("http://localhost:3001"); // Redirect to your frontend
	}
);

// Route for failed login
router.get("/failure", (req, res) => {
	res.send("Failed to authenticate with LinkedIn.");
});

router.get("/check", (req, res) => {
	if (req.isAuthenticated()) {
		res.sendStatus(200); // User is authenticated
	} else {
		res.sendStatus(401); // User is not authenticated
	}
});

// Logout route
router.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/");
	});
});

module.exports = router;
