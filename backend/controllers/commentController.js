const Comment = require("../models/commentModel");

exports.getCommentsByPostId = async (req, res) => {
	try {
		const comments = await Comment.find({ postId: req.params.postId });
		res.json(comments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.createComment = async (req, res) => {
	const { content } = req.body;
	try {
		const comment = await Comment.create({
			content,
			postId: req.params.postId,
			author: req.user.username,
		});
		res.status(201).json(comment);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			return res.status(404).json({ error: "Comment not found" });
		}
		if (comment.author !== req.user.username) {
			return res.status(401).json({ error: "Not authorized" });
		}
		await comment.remove();
		res.json({ message: "Comment removed" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
