import express from "express";
import multer from "multer";
import { login, register } from "../controllers/Auth.controller.js";
import {
  getRandomUsers,
  getUserByUsername,
  getUserInfo,
  updateUsers,
} from "../controllers/User.controller.js";
import { getUserPostLike } from "../controllers/PostLikes.controller.js";
import {
  toggleFollower,
  UserFollowingList,
} from "../controllers/UsersFollowers.controller.js";
import {
  getNotifications,
  updateNotifications,
  deleteNotification,
} from "../controllers/Notifications.controller.js";

const routes = express.Router();

const upload = multer({ dest: "uploads/" });

routes
  .route("/")
  .get(getUserByUsername)
  .put(upload.single("profile_image"), updateUsers);
routes.post("/register", register);
routes.post("/login", login);
routes.get("/random", getRandomUsers);
routes.get("/:username", getUserInfo);
routes.get("/:user_id/likes", getUserPostLike);
routes.get("/follow/:id_user_follower", UserFollowingList);
routes.post("/follow/:username", toggleFollower);
routes.get("/:user_id/notifications", getNotifications);
routes.put("/:user_id/notifications", updateNotifications);
routes.delete("/:user_id/notifications/:notification_id", deleteNotification);

export default routes;
