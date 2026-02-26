import { Post, User } from "../models/Associations.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["full_name", "username", "image_url"],
      },
    });

    if (posts.length === 0) return res.status(200).json({ posts: [] });

    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPostById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const posts = await Post.findAll(
      {
        include: {
          model: User,
          as: "user",
          attributes: ["full_name", "username", "image_url"],
        },
      },
      { where: { user_id } },
    );

    if (posts.length === 0) return res.status(200).json({ posts: [] });

    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createNewPost = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ message: "All fields are required" });

    const newPost = await Post.create({ content, user_id });

    return res.status(201).json({ message: "Post created", newPost });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
