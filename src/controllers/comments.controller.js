import { Comment, User } from "../models/Associations.js";
import jwt from "jsonwebtoken";

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: {
        model: User,
        as: "user",
        attributes: ["full_name", "username", "image_url"],
      },
      order: [["created_at", "DESC"]],
    });

    if (comments.length === 0) return res.status(200).json({ comments: [] });

    return res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(" ")[1], "clave_super_secreta");
  const user_id = decoded.id;
  const { post_id } = req.params;

  try {
    const { content } = req.body;

    const newComment = await Comment.create({
      content,
      post_id,
      user_id,
    });

    return res.status(201).json({ message: "Comment created", newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
