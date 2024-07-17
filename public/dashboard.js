const apiUrl =
	window.location.hostname === "localhost"
		? "http://localhost:5000/api"
		: "https://blog-production-e316.up.railway.app/api";

const logoutBtn = document.getElementById("logout-btn");
const createPostBtn = document.getElementById("create-post-btn");
const postForm = document.getElementById("post-form");
const submitPostBtn = document.getElementById("submit-post-btn");
const postsContainer = document.getElementById("posts-container");

logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("token");
	window.location.href = "index.html";
});

createPostBtn.addEventListener("click", () => {
	postForm.style.display = "block";
});

submitPostBtn.addEventListener("click", async () => {
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
				console.error("Failed to create post");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
});

async function fetchPosts() {
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
			console.error("Failed to fetch posts");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

function renderPost(post) {
	const postElement = document.createElement("div");
	postElement.className = "post";
	postElement.dataset.postId = post._id;

	const titleElement = document.createElement("h2");
	titleElement.textContent = post.title;

	const contentElement = document.createElement("p");
	contentElement.textContent = `${post.content.substring(0, 100)}...`;

	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.addEventListener("click", () => editPost(post._id));

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.addEventListener("click", () => deletePost(post._id));

	postElement.appendChild(titleElement);
	postElement.appendChild(contentElement);
	postElement.appendChild(editButton);
	postElement.appendChild(deleteButton);

	postsContainer.appendChild(postElement);
}

function toggleEditMode(id) {
	const postElement = document.querySelector(`.post[data-post-id="${id}"]`);
	const titleElement = postElement.querySelector("h2");
	const contentElement = postElement.querySelector("p");
	const editButton = postElement.querySelector("button:nth-of-type(1)");

	if (editButton.textContent === "Edit") {
		// Switch to edit mode
		const titleInput = document.createElement("input");
		titleInput.value = titleElement.textContent;
		titleInput.className = "edit-title";

		const contentTextarea = document.createElement("textarea");
		contentTextarea.value = contentElement.textContent;
		contentTextarea.className = "edit-content";

		const confirmButton = document.createElement("button");
		confirmButton.textContent = "Confirm";
		confirmButton.addEventListener("click", () => confirmEdit(id));

		postElement.insertBefore(titleInput, titleElement);
		postElement.insertBefore(contentTextarea, contentElement);
		postElement.appendChild(confirmButton);

		titleElement.style.display = "none";
		contentElement.style.display = "none";
		editButton.textContent = "Cancel";
	} else {
		// Cancel edit mode
		const titleInput = postElement.querySelector(".edit-title");
		const contentTextarea = postElement.querySelector(".edit-content");
		const confirmButton = postElement.querySelector("button:nth-of-type(3)");

		titleInput.remove();
		contentTextarea.remove();
		confirmButton.remove();

		titleElement.style.display = "";
		contentElement.style.display = "";
		editButton.textContent = "Edit";
	}
}

async function confirmEdit(id) {
	const postElement = document.querySelector(`.post[data-post-id="${id}"]`);
	const titleInput = postElement.querySelector(".edit-title");
	const contentTextarea = postElement.querySelector(".edit-content");
	const newTitle = titleInput.value;
	const newContent = contentTextarea.value;

	if (newTitle && newContent) {
		try {
			const updateResponse = await fetch(`${apiUrl}/posts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ title: newTitle, content: newContent }),
			});
			if (updateResponse.ok) {
				postsContainer.textContent = "";
				fetchPosts();
			} else {
				console.error("Failed to update post");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
}

function editPost(id) {
	toggleEditMode(id);
}

async function deletePost(id) {
	if (confirm("Are you sure you want to delete this post?")) {
		try {
			const response = await fetch(`${apiUrl}/posts/${id}`, {
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
