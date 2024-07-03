document.addEventListener("DOMContentLoaded", () => {
	const apiUrl = "http://localhost:5000/api";

	// Function to handle user registration
	async function registerUser(e) {
		e.preventDefault();
		const username = document.getElementById("reg-username").value;
		const email = document.getElementById("reg-email").value;
		const password = document.getElementById("reg-password").value;

		try {
			const res = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			console.log("Response status:", res.status);
			console.log("Response headers:", res.headers);

			const textResponse = await res.text();
			console.log("Raw response:", textResponse);

			if (res.ok) {
				const { token } = JSON.parse(textResponse);
				// const { token } = await res.json();
				localStorage.setItem("token", token);
				console.log("Registration successful");
				console.log("Registration successful, redirecting to dashboard...");
				window.location.href = "dashboard.html"; // Redirect to dashboard or another page
			} else {
				console.log("registration failed:", textResponse);
				const { error } = await res.json();
				console.error("Registration failed:", error);
				// Handle registration error (show message to user, clear form fields, etc.)
			}
		} catch (error) {
			console.error("Error registering user:", error);
		}
	}

	// Function to handle user login
	const loginForm = document.getElementById("login-form");

	loginForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		try {
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			const { token } = await response.json();
			localStorage.setItem("token", token);
			window.location.href = "dashboard.html"; // Redirect to dashboard or another page
		} catch (error) {
			console.error("Login Error:", error.message);
			// Handle login error (show message to user, clear form fields, etc.)
		}
	});

	function showRegisterSection(e) {
		e.preventDefault();
		document.getElementById("register-section").classList.remove("hidden");
		document.getElementById("login-section").classList.add("hidden");
	}

	// Show login section
	function showLoginSection(e) {
		e.preventDefault();
		document.getElementById("login-section").classList.remove("hidden");
		document.getElementById("register-section").classList.add("hidden");
	}

	// Event listeners for switching between login and registration forms
	document
		.getElementById("register-link")
		.addEventListener("click", showRegisterSection);
	document
		.getElementById("login-link")
		.addEventListener("click", showLoginSection);

	// Event listener for registration form submission
	const registerForm = document.getElementById("register-form");
	if (registerForm) {
		registerForm.addEventListener("submit", registerUser);
	} else {
		console.error("Register form not found.");
	}
});
