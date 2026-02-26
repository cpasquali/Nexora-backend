import express from "express";
import {
  getAllPosts,
  getAllPostById,
  createNewPost,
} from "../controllers/Post.controller.js";

const routes = express.Router();

routes.get("/", getAllPosts);

routes.route("/user/:user_id").get(getAllPostById).post(createNewPost);

export default routes;
