import express from "express";
import {
  getAllPosts,
  getAllPostByUsername,
  createNewPost,
} from "../controllers/Post.controller.js";

const routes = express.Router();

routes.route("/").get(getAllPosts).post(createNewPost);

routes.route("/user/:username").get(getAllPostByUsername);

export default routes;
