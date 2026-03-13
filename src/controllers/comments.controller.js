import { Comment, User } from "../models/Associations.js";
import jwt from "jsonwebtoken";

function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const weeks = Math.floor(seconds / 604800);

  if (seconds === 0) return "now";
  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return `${weeks}w`;
}

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const commentsDb = await Comment.findAll({
      where: { post_id: postId },
      include: {
        model: User,
        as: "user",
        attributes: ["full_name", "username", "image_url", "created_at"],
      },
      order: [["created_at", "DESC"]],
    });

    const comments = commentsDb.map((comment) => ({
      ...comment.toJSON(),
      time_ago: timeAgo(comment.created_at),
    }));

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

    if (!content)
      return res
        .status(404)
        .json({ message: "All fields are required", type: "EMPTY_INPUTS" });

    const newComment = await Comment.create({
      content,
      post_id,
      user_id,
    });

    return res.status(201).json({
      message: "Comment created",
      newComment: {
        ...newComment.toJSON(),
        time_ago: timeAgo(new Date()),
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
