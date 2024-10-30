const express = require("express");
const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

// MongoDB setup for storing scheduled posts and user tokens
mongoose.connect("mongodb://localhost:27017/linkedin_scheduler", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Define schema and model for scheduled posts
const PostSchema = new mongoose.Schema({
	userId: String,
	accessToken: String,
	content: String,
	scheduleTime: Date,
	posted: { type: Boolean, default: false },
});
const Post = mongoose.model("Post", PostSchema);

