import { Like } from "../models/Like.model.js";

export const toggleLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    const existingLike = await Like.findOne({
      where: { user_id, post_id },
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.json({ message: "Like removed" });
    }

    await Like.create({ user_id, post_id });

    res.json({ message: "Like added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikesByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const Likes = await Like.count({
      where: { post_id: postId },
    });

    return res.json({ Likes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
