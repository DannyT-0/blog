// backend/controllers/postController.js
const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
	const { title, content } = req.body;
	try {
		const post = await Post.create({ title, content, author: req.user.id });
		res.status(201).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("author", "username");
		res.status(200).json(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate(
			"author",
			"username"
		);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.updatePost = async (req, res) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Post deleted" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
