import React, { useEffect, useState } from "react";
import LoginButton from "./components/LoginButton";
import SchedulePostForm from "./components/SchedulePostForm";
import { checkAuth } from "./services/api"; // Import the authentication check function

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				const isLoggedIn = await checkAuth();
				setIsAuthenticated(isLoggedIn);
			} catch (error) {
				console.error("Error during authentication check:", error);
			} finally {
				setLoading(false);
			}
		};

		verifyAuth();
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="App">
			<h1>LinkedIn Post Scheduler</h1>
			{isAuthenticated ? <SchedulePostForm /> : <LoginButton />}
		</div>
	);
}

export default App;
