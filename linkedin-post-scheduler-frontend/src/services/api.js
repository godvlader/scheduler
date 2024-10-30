import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

// Function to get the LinkedIn authentication URL
export const getLinkedInAuthUrl = () => `${API_URL}/auth/linkedin`;

// Function to check if the user is authenticated
export const checkAuth = async () => {
	try {
		const response = await axios.get(`${API_URL}/auth/check`, {
			withCredentials: true, // Ensures session cookie is sent
		});
		return response.status === 200;
	} catch (error) {
		console.error("Error checking authentication status:", error);
		return false;
	}
};

// Function to schedule a new post
export const schedulePost = async (postData) => {
	try {
		const response = await axios.post(`${API_URL}/schedule`, postData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error scheduling post:", error);
		throw error;
	}
};

// Function to fetch all scheduled posts
export const fetchScheduledPosts = async () => {
	try {
		const response = await axios.get(`${API_URL}/schedule`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching scheduled posts:", error);
		throw error;
	}
};
