import { User } from "../models/Associations.js";
import { UsersFollowers } from "../models/UsersFollowers.model.js";
import jwt from "jsonwebtoken";

export const toggleFollower = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(" ")[1], "clave_super_secreta");
  const id_user_follower = decoded.id;
  const { username } = req.params;
  try {
    const userFollowing = await User.findOne({ where: { username } });

    const id_user_following = userFollowing.dataValues.id;

    const existingFollowing = await UsersFollowers.findOne({
      where: { id_user_follower, id_user_following },
    });

    if (existingFollowing) {
      await UsersFollowers.destroy({
        where: { id_user_follower, id_user_following },
      });
      const newCantFollowers = await UsersFollowers.count({
        where: { id_user_follower },
      });

      return res.status(201).json({
        message: "Follower removed",
        newCantFollowers,
        userFollower: existingFollowing.dataValues,
        type: "removed",
      });
    }

    const { dataValues } = await UsersFollowers.create({
      id_user_follower,
      id_user_following,
    });

    const newCantFollowers = await UsersFollowers.count({
      where: { id_user_follower },
    });

    return res.status(201).json({
      message: "Follower added",
      newCantFollowers,
      userFollower: dataValues,
      type: "added",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const UserFollowingList = async (req, res) => {
  const { id_user_follower } = req.params;
  try {
    const usersFollowing = await UsersFollowers.findAll({
      where: { id_user_follower: id_user_follower },
    });

    if (usersFollowing.length === 0)
      return res.status(200).json({ usersFollowing: [] });

    return res.status(200).json({ usersFollowing });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
