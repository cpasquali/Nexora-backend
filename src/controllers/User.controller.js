import { User } from "../models/User.model.js";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

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
        "banner_image_url",
      ],
    });

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
      limit: 3,
      order: db.random(),
      where: {
        id: {
          [Op.ne]: user_id,
        },
      },
    });

    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
