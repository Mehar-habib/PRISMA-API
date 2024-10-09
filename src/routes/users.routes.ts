import { createUser, getUserById, getUsers } from "@/controllers/users";
import express from "express";

const userRouter = express.Router();
userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);

export default userRouter;
