import React, { useState } from "react";
import { schedulePost } from "../services/api";

const SchedulePostForm = () => {
	const [content, setContent] = useState("");
	const [scheduleTime, setScheduleTime] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await schedulePost({ content, scheduleTime });
			setMessage("Post scheduled successfully!");
			setContent("");
			setScheduleTime("");
		} catch (error) {
			setMessage("Error scheduling post. Please try again.");
		}
	};

	return (
		<div>
			<h2>Schedule a New Post</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Content:</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Schedule Time:</label>
					<input
						type="datetime-local"
						value={scheduleTime}
						onChange={(e) => setScheduleTime(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Schedule Post</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default SchedulePostForm;
