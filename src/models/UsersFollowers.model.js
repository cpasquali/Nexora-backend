import { DataTypes } from "sequelize";
import { db } from "../db.js";

export const UsersFollowers = db.define(
  "users_followers",
  {
    id_user_follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_user_following: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false },
);
