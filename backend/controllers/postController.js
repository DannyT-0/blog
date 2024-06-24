const Post = require("../models/postModel");

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("author", "username");
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.createPost = async (req, res) => {
	const { title, content } = req.body;
	try {
		const post = await Post.create({ title, content, author: req.user.id });
		res.status(201).json(post);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getPostById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate(
			"author",
			"username"
		);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updatePost = async (req, res) => {
	const { title, content, published } = req.body;
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.author.toString() !== req.user.id) {
			return res.status(401).json({ error: "Not authorized" });
		}
		post.title = title || post.title;
		post.content = content || post.content;
		post.published =
			typeof published !== "undefined" ? published : post.published;
		await post.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.author.toString() !== req.user.id) {
			return res.status(401).json({ error: "Not authorized" });
		}
		await post.remove();
		res.json({ message: "Post removed" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
