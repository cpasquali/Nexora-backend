import express from "express";
import { toggleLike, getLikesByPost } from "../controllers/Likes.controller.js";

const router = express.Router();

router.post("/", toggleLike);
router.get("/:postId", getLikesByPost);

export default router;
