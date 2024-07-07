// backend/controllers/commentController.js
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
	const { content, postId } = req.body;
	try {
		const comment = await Comment.create({
			content,
			author: req.user.id,
			post: postId,
		});
		res.status(201).json(comment);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.getComments = async (req, res) => {
	try {
		const comments = await Comment.find({ post: req.params.postId }).populate(
			"author",
			"username"
		);
		res.status(200).json(comments);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.deleteComment = async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "Comment deleted" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
