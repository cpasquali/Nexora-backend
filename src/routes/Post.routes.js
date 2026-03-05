import express from "express";
import {
  getAllPosts,
  getAllPostByUserId,
  createNewPost,
} from "../controllers/Post.controller.js";

const routes = express.Router();

routes.get("/", getAllPosts);

routes.route("/user/:user_id").get(getAllPostByUserId).post(createNewPost);

export default routes;
