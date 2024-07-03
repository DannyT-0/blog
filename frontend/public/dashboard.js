const logoutBtn = document.getElementById("logout-btn");
const createPostBtn = document.getElementById("create-post-btn");
const postForm = document.getElementById("post-form");
const submitPostBtn = document.getElementById("submit-post-btn");
const postsContainer = document.getElementById("posts-container");

logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("token");
	window.location.href = "index.html"; // Redirect to login page
});

createPostBtn.addEventListener("click", () => {
	postForm.style.display = "block";
});

submitPostBtn.addEventListener("click", async () => {
	const title = document.getElementById("post-title").value;
	const content = document.getElementById("post-content").value;
	if (title && content) {
		try {
			const response = await fetch("http://localhost:5000/api/posts", {
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
				console.error("Failed to create post");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
});

async function fetchPosts() {
	try {
		const response = await fetch("http://localhost:5000/api/posts", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.ok) {
			const posts = await response.json();
			posts.forEach(renderPost);
		} else {
			console.error("Failed to fetch posts");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

function renderPost(post) {
	const postElement = document.createElement("div");
	postElement.className = "post";

	const titleElement = document.createElement("h2");
	titleElement.textContent = post.title;

	const contentElement = document.createElement("p");
	contentElement.textContent = `${post.content.substring(0, 100)}...`;

	const viewButton = document.createElement("button");
	viewButton.textContent = "View";
	viewButton.addEventListener("click", () => viewPost(post._id));

	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.addEventListener("click", () => editPost(post._id));

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.addEventListener("click", () => deletePost(post._id));

	postElement.appendChild(titleElement);
	postElement.appendChild(contentElement);
	postElement.appendChild(viewButton);
	postElement.appendChild(editButton);
	postElement.appendChild(deleteButton);

	postsContainer.appendChild(postElement);
}

async function viewPost(id) {
	try {
		const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.ok) {
			const post = await response.json();
			alert(`Title: ${post.title}\n\nContent: ${post.content}`);
		} else {
			console.error("Failed to fetch post");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

async function editPost(id) {
	try {
		console.log("Fetching post with ID:", id);
		const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		if (response.ok) {
			const post = await response.json();
			const newTitle = prompt("Enter new title:", post.title);
			const newContent = prompt("Enter new content:", post.content);
			if (newTitle && newContent) {
				const updateResponse = await fetch(
					`http://localhost:5000/api/posts/${id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify({ title: newTitle, content: newContent }),
					}
				);
				if (updateResponse.ok) {
					postsContainer.textContent = "";
					fetchPosts();
				} else {
					console.error("Failed to update post");
				}
			}
		} else {
			console.error("Failed to fetch post");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

async function deletePost(id) {
	if (confirm("Are you sure you want to delete this post?")) {
		try {
			const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (response.ok) {
				postsContainer.textContent = "";
				fetchPosts();
			} else {
				console.error("Failed to delete post");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
}

// Initial fetch
fetchPosts();
