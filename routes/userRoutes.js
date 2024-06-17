import express from "express";
import {
  registerUser,
  authUser,
  getAllUsers,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/auth/register", registerUser);

userRouter.get("/auth/login", authUser);

userRouter.get("/auth/users", getAllUsers);

export default userRouter;
