import express from "express";
import cors from "cors";
import authRoutes from "./routes/User.routes.js";
import postRoutes from "./routes/Post.routes.js";
import userRoutes from "./routes/User.routes.js";
import commentsRoutes from "./routes/Comments.routes.js";
import postLikesRoutes from "./routes/PostLikes.routes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Servidor corriendo con exito" });
});

app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/posts", postRoutes);
app.use("/v1/comments", commentsRoutes);
app.use("/v1/likes", postLikesRoutes);

app.listen(3000, () => {
  console.log("servidor corriendo en http://localhost:3000");
});
