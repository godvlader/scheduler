const axios = require("axios");
const Post = require("../models/Post");

// Function to publish a single post to LinkedIn
const postToLinkedIn = async (accessToken, content) => {
	const url = "https://api.linkedin.com/v2/ugcPosts";
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		"X-Restli-Protocol-Version": "2.0.0",
		"Content-Type": "application/json",
	};

	const postData = {
		author: `urn:li:person:${userId}`, // userId obtained from LinkedIn profile
		lifecycleState: "PUBLISHED",
		specificContent: {
			"com.linkedin.ugc.ShareContent": {
				shareCommentary: {
					text: content,
				},
				shareMediaCategory: "NONE",
			},
		},
		visibility: {
			"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
		},
	};

	try {
		const response = await axios.post(url, postData, { headers });
		console.log("LinkedIn post successful:", response.data);
	} catch (error) {
		console.error(
			"Error posting to LinkedIn:",
			error.response?.data || error.message
		);
	}
};

// Cron job function to publish all scheduled posts
async function publishScheduledPosts() {
	const now = new Date();
	const postsToPost = await Post.find({
		posted: false,
		scheduleTime: { $lte: now },
	});

	for (const post of postsToPost) {
		try {
			await postToLinkedIn(post.accessToken, post.userId, post.content);
			post.posted = true;
			await post.save();
			console.log(`Posted: ${post.content}`);
		} catch (error) {
			console.error(`Failed to post to LinkedIn: ${error}`);
		}
	}
}

// Export both functions with default export
module.exports = { postToLinkedIn, publishScheduledPosts };
