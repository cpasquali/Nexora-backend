import { PostLikes } from "../models/Associations.js";
import jwt from "jsonwebtoken";

export const toggleLike = async (req, res) => {
  const { post_id } = req.params;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(" ")[1], "clave_super_secreta");
  const user_id = decoded.id;
  try {
    const existingLike = await PostLikes.findOne({
      where: { user_id, post_id },
    });

    if (existingLike) {
      await PostLikes.destroy({
        where: { user_id, post_id },
      });

      const newPostCantLikes = await PostLikes.count({ where: { post_id } });
      return res.status(200).json({
        message: "Like removed",
        newPostCantLikes,
        postLike: existingLike,
        type: "removed",
      });
    }

    const { dataValues } = await PostLikes.create({ user_id, post_id });

    const newPostCantLikes = await PostLikes.count({ where: { post_id } });
    return res.status(201).json({
      message: "Like added",
      newPostCantLikes,
      postLike: { ...dataValues, post_id: Number(dataValues.post_id) },
      type: "added",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPostLike = async (req, res) => {
  const { user_id } = req.params;
  try {
    const likedPosts = await PostLikes.findAll({ where: { user_id } });

    if (likedPosts.length === 0)
      return res.status(200).json({ likedPosts: [] });

    return res.status(200).json({ likedPosts });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
