import { Comment } from "../models/Comment.model.js";

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { post_id: postId },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, post_id, user_id } = req.body;

    const comment = await Comment.create({
      content,
      post_id,
      user_id,
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
