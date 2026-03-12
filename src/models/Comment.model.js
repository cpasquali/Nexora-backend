import { DataTypes } from "sequelize";
import { db } from "../db.js";

export const Comment = db.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  { timestamps: false },
);
