import express from "express";
import { login, register } from "../controllers/Auth.controller.js";
import {
  getRandomUsers,
  getUserByUsername,
  getUserInfo,
} from "../controllers/User.controller.js";

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/random", getRandomUsers);
routes.get("/:username", getUserInfo);

routes.get("/", getUserByUsername);

export default routes;
