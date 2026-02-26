import { User } from "./User.model.js";
import { Post } from "./Post.model.js";

Post.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Post, { foreignKey: "user_id", as: "post" });

export { User, Post };
