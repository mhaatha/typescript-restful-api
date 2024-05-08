import express from "express";
import { UserController } from "../controllers/user-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/users/register", UserController.register);
publicRouter.post("/api/users/login", UserController.login);