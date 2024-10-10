import {
  createUser,
  deleteUserById,
  getAttendants,
  getUserById,
  getUsers,
  updateUserById,
  updateUserPasswordById,
} from "@/controllers/users";
import express from "express";

const userRouter = express.Router();
userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.get("/attendants", getAttendants);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUserById);
userRouter.put("/users/update-password/:id", updateUserPasswordById);
userRouter.delete("/users/:id", deleteUserById);

export default userRouter;
