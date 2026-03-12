import express from "express";
import {
  getAllPosts,
  getAllPostByUsername,
  createNewPost,
} from "../controllers/Post.controller.js";
import { createComment } from "../controllers/comments.controller.js";

const routes = express.Router();

routes.route("/").get(getAllPosts).post(createNewPost);

routes.route("/user/:username").get(getAllPostByUsername);

routes.post("/:post_id/comment/", createComment);

export default routes;
