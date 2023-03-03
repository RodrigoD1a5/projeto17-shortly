import { Router } from "express";
import { getUserById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/users/me', getUserById);

export { userRouter };