import { Post, User } from "../models/Associations.js";
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

export const getAllPosts = async (req, res) => {
  try {
    const postsDb = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["full_name", "username", "image_url"],
      },
      order: [["created_at", "DESC"]],
    });

    const posts = postsDb.map((post) => ({
      ...post.toJSON(),
      time_ago: timeAgo(post.created_at),
    }));

    if (posts.length === 0) return res.status(200).json({ posts: [] });

    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPostByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });

    const postsDb = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["full_name", "username", "image_url"],
      },
      where: { user_id: user.dataValues.id },
      order: [["created_at", "DESC"]],
    });

    const posts = postsDb.map((post) => ({
      ...post.toJSON(),
      time_ago: timeAgo(post.created_at),
    }));

    if (posts.length === 0) return res.status(200).json({ posts: [] });

    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createNewPost = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(" ")[1], "clave_super_secreta");
  const user_id = decoded.id;

  try {
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ message: "All fields are required" });

    const newPost = await Post.create({ content, user_id });

    return res.status(201).json({
      message: "Post created",
      newPost: { ...newPost.toJSON(), time_ago: timeAgo(new Date()) },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
