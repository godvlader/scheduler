require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cron = require("node-cron");
const cors = require("cors");

const { publishScheduledPosts } = require("./utils/publishToLinkedIn");
const authRoutes = require("./routes/auth");
const schedulerRoutes = require("./routes/scheduler");

const app = express();

// MongoDB connection
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Failed to connect to MongoDB", err));

// Enable CORS
app.use(
	cors({
		origin: "http://localhost:3001", // Allow requests from the frontend origin
		credentials: true, // Allow credentials (cookies) to be sent
	})
);

// Middleware for JSON and Sessions
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET || "your_default_secret_key",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // set to true if using HTTPS in production
	})
);
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

// Routes
app.use("/auth", authRoutes);
app.use("/schedule", schedulerRoutes);

// Schedule Cron Job for Posting
cron.schedule("* * * * *", publishScheduledPosts);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
