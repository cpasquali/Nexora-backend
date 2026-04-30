import express from "express";
import {
  getAllPosts,
  getAllPostByUsername,
  createNewPost,
  deletePost,
} from "../controllers/Post.controller.js";
import { createComment } from "../controllers/comments.controller.js";
import multer from "multer";

const routes = express.Router();

const upload = multer({ dest: "uploads/" });

routes.route("/").get(getAllPosts).post(upload.single("file"), createNewPost);

routes.delete("/:post_id", deletePost);

routes.route("/user/:username").get(getAllPostByUsername);

routes.post("/:post_id/comment/", createComment);

export default routes;
