import { User } from "./User.model.js";
import { Post } from "./Post.model.js";
import { Comment } from "./Comment.model.js";

Post.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Post, { foreignKey: "user_id", as: "post" });
User.hasMany(Comment, { foreignKey: "user_id", as: "comment" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

export { User, Post, Comment };
