import express from "express";
import { login, register } from "../controllers/Auth.controller.js";
import { getUserInfo } from "../controllers/User.controller.js";

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);

routes.get("/:id", getUserInfo);

export default routes;
