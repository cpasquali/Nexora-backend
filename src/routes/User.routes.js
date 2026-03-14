import express from "express";
import { login, register } from "../controllers/Auth.controller.js";
import {
  getRandomUsers,
  getUserByUsername,
  getUserInfo,
} from "../controllers/User.controller.js";
import { getUserPostLike } from "../controllers/PostLikes.controller.js";
import {
  toggleFollower,
  UserFollowingList,
} from "../controllers/UsersFollowers.controller.js";

const routes = express.Router();

routes.get("/", getUserByUsername);
routes.post("/register", register);
routes.post("/login", login);
routes.get("/random", getRandomUsers);
routes.get("/:username", getUserInfo);
routes.get("/:user_id/likes", getUserPostLike);
routes.get("/follow/:id_user_follower", UserFollowingList);
routes.post("/follow/:id_user_following", toggleFollower);

export default routes;
