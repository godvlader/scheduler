const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	userId: String,
	accessToken: String,
	content: String,
	scheduleTime: Date,
	posted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", PostSchema);
