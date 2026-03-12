import express from "express";
import { getCommentsByPost } from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/:postId", getCommentsByPost);

export default router;
