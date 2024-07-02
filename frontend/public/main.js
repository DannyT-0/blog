// const apiUrl = "http://localhost:5000/api";

// document.addEventListener("DOMContentLoaded", () => {
// 	document
// 		.getElementById("home-btn")
// 		.addEventListener("click", showHomeSection);
// 	document
// 		.getElementById("new-post-btn")
// 		.addEventListener("click", showNewPostSection);
// 	document
// 		.getElementById("login-btn")
// 		.addEventListener("click", showLoginSection);
// 	initApp();
// });

// function initApp() {
// 	fetchPosts();
// 	document
// 		.getElementById("new-post-form")
// 		.addEventListener("submit", createPost);
// }

// function showSection(sectionId) {
// 	document
// 		.querySelectorAll(".section")
// 		.forEach((section) => section.classList.remove("active"));
// 	document.getElementById(sectionId).classList.add("active");
// }

// function showHomeSection() {
// 	showSection("home-section");
// }

// function showNewPostSection() {
// 	showSection("new-post-section");
// }

// function showLoginSection() {
// 	showSection("login-section");
// }

// async function fetchPosts() {
// 	try {
// 		const res = await fetch(`${apiUrl}/posts`);
// 		const posts = await res.json();
// 		const postsContainer = document.getElementById("posts");
// 		postsContainer.textContent = ""; // Clear previous posts

// 		posts.forEach((post) => {
// 			appendPostToPage(post);
// 		});
// 	} catch (error) {
// 		console.error("Error fetching posts:", error);
// 	}
// }

// async function createPost(e) {
// 	e.preventDefault();
// 	const title = document.getElementById("new-title").value;
// 	const content = document.getElementById("new-content").value;

// 	try {
// 		const res = await fetch(`${apiUrl}/posts`, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 			body: JSON.stringify({ title, content }),
// 		});

// 		if (res.ok) {
// 			const post = await res.json();
// 			document.getElementById("new-title").value = "";
// 			document.getElementById("new-content").value = "";
// 			appendPostToPage(post);
// 			showHomeSection();
// 		} else {
// 			console.error("Failed to create post:", res.statusText);
// 		}
// 	} catch (error) {
// 		console.error("Error creating post:", error);
// 	}
// }

// function appendPostToPage(post) {
// 	const postsContainer = document.getElementById("posts");

// 	const postElement = document.createElement("div");
// 	postElement.className = "post-box";
// 	postElement.id = `post-${post._id}`;

// 	const titleElement = document.createElement("h2");
// 	titleElement.textContent = post.title;

// 	const contentElement = document.createElement("p");
// 	contentElement.textContent = post.content;

// 	const editButton = document.createElement("button");
// 	editButton.textContent = "Edit";
// 	editButton.className = "edit-btn";
// 	editButton.addEventListener("click", () => editPost(post._id));

// 	const deleteButton = document.createElement("button");
// 	deleteButton.textContent = "Delete";
// 	deleteButton.className = "delete-btn";
// 	deleteButton.addEventListener("click", () => deletePost(post._id));

// 	postElement.appendChild(titleElement);
// 	postElement.appendChild(contentElement);
// 	postElement.appendChild(editButton);
// 	postElement.appendChild(deleteButton);

// 	postsContainer.prepend(postElement);
// }

// function editPost(postId) {
// 	const postElement = document.getElementById(`post-${postId}`);
// 	const title = postElement.querySelector("h2").textContent;
// 	const content = postElement.querySelector("p").textContent;

// 	postElement.textContent = ""; // Clear existing content

// 	const titleInput = document.createElement("input");
// 	titleInput.type = "text";
// 	titleInput.className = "edit-title";
// 	titleInput.value = title;

// 	const contentTextarea = document.createElement("textarea");
// 	contentTextarea.className = "edit-content";
// 	contentTextarea.textContent = content;

// 	const updateButton = document.createElement("button");
// 	updateButton.textContent = "Update";
// 	updateButton.className = "update-btn";
// 	updateButton.addEventListener("click", () => updatePost(postId));

// 	const cancelButton = document.createElement("button");
// 	cancelButton.textContent = "Cancel";
// 	cancelButton.className = "cancel-btn";
// 	cancelButton.addEventListener("click", () =>
// 		cancelEdit(postId, title, content)
// 	);

// 	postElement.appendChild(titleInput);
// 	postElement.appendChild(contentTextarea);
// 	postElement.appendChild(updateButton);
// 	postElement.appendChild(cancelButton);
// }

// async function updatePost(postId) {
// 	const postElement = document.getElementById(`post-${postId}`);
// 	const title = postElement.querySelector(".edit-title").value;
// 	const content = postElement.querySelector(".edit-content").value;

// 	try {
// 		const res = await fetch(`${apiUrl}/posts/${postId}`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 			body: JSON.stringify({ title, content }),
// 		});

// 		if (res.ok) {
// 			const updatedPost = await res.json();
// 			postElement.textContent = ""; // Clear existing content

// 			const titleElement = document.createElement("h2");
// 			titleElement.textContent = updatedPost.title;

// 			const contentElement = document.createElement("p");
// 			contentElement.textContent = updatedPost.content;

// 			const editButton = document.createElement("button");
// 			editButton.textContent = "Edit";
// 			editButton.className = "edit-btn";
// 			editButton.addEventListener("click", () => editPost(postId));

// 			const deleteButton = document.createElement("button");
// 			deleteButton.textContent = "Delete";
// 			deleteButton.className = "delete-btn";
// 			deleteButton.addEventListener("click", () => deletePost(postId));

// 			postElement.appendChild(titleElement);
// 			postElement.appendChild(contentElement);
// 			postElement.appendChild(editButton);
// 			postElement.appendChild(deleteButton);
// 		} else {
// 			console.error("Failed to update post:", res.statusText);
// 		}
// 	} catch (error) {
// 		console.error("Error updating post:", error);
// 	}
// }

// function cancelEdit(postId, title, content) {
// 	const postElement = document.getElementById(`post-${postId}`);
// 	postElement.textContent = ""; // Clear existing content

// 	const titleElement = document.createElement("h2");
// 	titleElement.textContent = title;

// 	const contentElement = document.createElement("p");
// 	contentElement.textContent = content;

// 	const editButton = document.createElement("button");
// 	editButton.textContent = "Edit";
// 	editButton.className = "edit-btn";
// 	editButton.addEventListener("click", () => editPost(postId));

// 	const deleteButton = document.createElement("button");
// 	deleteButton.textContent = "Delete";
// 	deleteButton.className = "delete-btn";
// 	deleteButton.addEventListener("click", () => deletePost(postId));

// 	postElement.appendChild(titleElement);
// 	postElement.appendChild(contentElement);
// 	postElement.appendChild(editButton);
// 	postElement.appendChild(deleteButton);
// }

// async function deletePost(postId) {
// 	try {
// 		const res = await fetch(`${apiUrl}/posts/${postId}`, {
// 			method: "DELETE",
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
// 			},
// 		});

// 		if (res.ok) {
// 			const postElement = document.getElementById(`post-${postId}`);
// 			postElement.remove();
// 		} else {
// 			console.error("Failed to delete post:", res.statusText);
// 		}
// 	} catch (error) {
// 		console.error("Error deleting post:", error);
// 	}
// }

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	try {
		const response = await fetch("/api/auth/login", {
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
		window.location.href = "/dashboard.html"; // Redirect to dashboard or another page
	} catch (error) {
		console.error("Login Error:", error.message);
		// Handle error (show message to user, clear form fields, etc.)
	}
});
