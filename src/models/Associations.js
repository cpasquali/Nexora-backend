import { User } from "./User.model.js";
import { Post } from "./Post.model.js";
import { Comment } from "./Comment.model.js";
import { PostLikes } from "./PostLikes.model.js";

Post.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Post, { foreignKey: "user_id", as: "post" });
User.hasMany(Comment, { foreignKey: "user_id", as: "comment" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.belongsToMany(Post, { through: PostLikes, foreignKey: "user_id" });
Post.belongsToMany(User, { through: PostLikes, foreignKey: "post_id" });

export { User, Post, Comment, PostLikes };
