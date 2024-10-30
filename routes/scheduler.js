const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/auth/linkedin");
}

// Schedule a post (only accessible if logged in)
router.post("/", ensureAuthenticated, async (req, res) => {
	const { content, scheduleTime } = req.body;
	const { accessToken, id: userId } = req.user;

	const newPost = new Post({
		userId,
		accessToken,
		content,
		scheduleTime: new Date(scheduleTime),
	});

	await newPost.save();
	res.json({ message: "Post scheduled successfully!" });
});

router.post("/post", async (req, res) => {
	const { content } = req.body;
	const accessToken = req.session.accessToken; // Retrieve access token from session

	if (!accessToken) {
		return res.status(401).json({ error: "User is not authenticated" });
	}

	try {
		await postToLinkedIn(accessToken, content);
		res.json({ message: "Post created successfully on LinkedIn" });
	} catch (error) {
		res.status(500).json({ error: "Failed to post on LinkedIn" });
	}
});

// Route to render the schedule form
router.get("/", ensureAuthenticated, (req, res) => {
	res.send("Schedule form goes here"); // Replace with actual form rendering code
});

module.exports = router;
