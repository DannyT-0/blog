const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("token");
	window.location.href = "/"; // Redirect to login page
});
