// backend/routes/postRoutes.js
const express = require("express");
const Post = require("../models/postModel");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
	const posts = await Post.find();
	res.json(posts);
});

router.post("/", protect, async (req, res) => {
	const post = new Post({ ...req.body, author: req.user.id });
	try {
		await post.save();
		res.status(201).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:id", protect, async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!post) return res.status(404).json({ error: "Post not found" });
		res.json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.delete("/:id", protect, async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });
		res.sendStatus(204);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
