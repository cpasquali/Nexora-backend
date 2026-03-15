import { User } from "../models/User.model.js";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { UsersFollowers } from "../models/UsersFollowers.model.js";

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
        "banner_image_url",
        "description",
        "id",
      ],
    });

    const cant_followers = await UsersFollowers.count({
      where: { id_user_following: user.dataValues.id },
    });

    return res
      .status(200)
      .json({ user: { ...user.dataValues, cant_followers } });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const user = await User.findAll({
      where: { username: { [Op.startsWith]: username } },
      attributes: ["full_name", "username", "image_url", "description"],
    });
    if (!user)
      return res
        .status(404)
        .json({ user: [], message: "User not found", error: "USER_NOT_FOUND" });

    return res.status(200).json({ user });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRandomUsers = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(" ")[1], "clave_super_secreta");
  const user_id = decoded.id;

  try {
    const users = await User.findAll({
      limit: 6,
      order: db.random(),
      where: {
        id: {
          [Op.ne]: user_id,
        },
      },
      attributes: ["id", "full_name", "image_url", "username"],
    });

    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
