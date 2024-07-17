const apiUrl =
	window.location.hostname === "localhost"
		? "http://localhost:5000/api"
		: "https://blog-production-e316.up.railway.app/api";

const logoutBtn = document.getElementById("logout-btn");
const createPostBtn = document.getElementById("create-post-btn");
const postForm = document.getElementById("post-form");
const submitPostBtn = document.getElementById("submit-post-btn");
const postsContainer = document.getElementById("posts-container");

function checkAuth() {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No token found, redirecting to login");
		window.location.href = "index.html";
		return false;
	}
	return true;
}

logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("token");
	window.location.href = "index.html";
});

createPostBtn.addEventListener("click", () => {
	postForm.style.display = "block";
});

submitPostBtn.addEventListener("click", async () => {
	if (!checkAuth()) return;

	const title = document.getElementById("post-title").value;
	const content = document.getElementById("post-content").value;
	if (title && content) {
		try {
			const response = await fetch(`${apiUrl}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ title, content }),
			});

			if (response.ok) {
				const post = await response.json();
				renderPost(post);
				postForm.style.display = "none";
				document.getElementById("post-title").value = "";
				document.getElementById("post-content").value = "";
			} else {
				const errorText = await response.text();
				console.error(
					`Failed to create post: ${response.status} ${response.statusText}`,
					errorText
				);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
});

async function fetchPosts() {
	if (!checkAuth()) return;

	try {
		const response = await fetch(`${apiUrl}/posts`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.ok) {
			const posts = await response.json();
			posts.forEach(renderPost);
		} else {
			const errorText = await response.text();
			console.error(
				`Failed to fetch posts: ${response.status} ${response.statusText}`,
				errorText
			);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

// ... rest of the code remains the same ...

// Initial fetch
fetchPosts();
