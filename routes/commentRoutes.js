// backend/routes/commentRoutes.js
const express = require("express");
const {
	createComment,
	getComments,
	deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:postId").get(getComments).post(protect, createComment);

router.route("/:id").delete(protect, deleteComment);

module.exports = router;
