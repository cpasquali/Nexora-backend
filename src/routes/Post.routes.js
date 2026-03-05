import express from "express";
import {
  getAllPosts,
  getAllPostByUserId,
  createNewPost,
} from "../controllers/Post.controller.js";

const routes = express.Router();

routes.route("/").get(getAllPosts).post(createNewPost);

routes.route("/user/:user_id").get(getAllPostByUserId);

export default routes;
