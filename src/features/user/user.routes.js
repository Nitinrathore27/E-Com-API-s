import express from "express";
import { UserController } from "./user.controller.js";
const userRouter = express.Router();

// const userController = new UserController();

userRouter.post("/signup", UserController.signUp);
userRouter.post("/signin", UserController.signIn);

export default userRouter;
