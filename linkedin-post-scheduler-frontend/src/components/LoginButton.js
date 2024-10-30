import React from "react";

const LoginButton = () => {
	const handleLogin = () => {
		window.location.href = "http://localhost:3000/auth/linkedin"; // Direct to backend LinkedIn login route
	};

	return (
		<button onClick={handleLogin} className="btn btn-primary">
			Log in with LinkedIn
		</button>
	);
};

export default LoginButton;
