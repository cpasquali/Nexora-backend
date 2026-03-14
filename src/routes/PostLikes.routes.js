import express from "express";
import { toggleLike } from "../controllers/PostLikes.controller.js";

const router = express.Router();

router.post("/:post_id", toggleLike);

export default router;
