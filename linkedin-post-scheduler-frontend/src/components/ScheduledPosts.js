import React, { useEffect, useState } from "react";
import { fetchScheduledPosts } from "../services/api";

const ScheduledPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const response = await fetchScheduledPosts();
				setPosts(response.data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		getPosts();
	}, []);

	return (
		<div>
			<h2>Scheduled Posts</h2>
			<ul>
				{posts.map((post, index) => (
					<li key={index}>
						<p>
							<strong>Content:</strong> {post.content}
						</p>
						<p>
							<strong>Scheduled Time:</strong>{" "}
							{new Date(post.scheduleTime).toLocaleString()}
						</p>
						<p>
							<strong>Status:</strong> {post.posted ? "Posted" : "Scheduled"}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ScheduledPosts;
