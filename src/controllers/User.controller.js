import { User } from "../models/User.model.js";

export const getUserInfo = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: [
        "full_name",
        "username",
        "created_at",
        "image_url",
        "description",
      ],
    });

    return res.status(200).json({ user });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
