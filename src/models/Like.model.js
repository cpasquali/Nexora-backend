import { DataTypes } from "sequelize";
import { db } from "../db.js";

export const Like = db.define(
  "likes",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { timestamps: false },
);
