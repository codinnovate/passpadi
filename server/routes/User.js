import { Router } from "express";
import { GoogleAuth, Register, Login } from "../controllers/User.js";

export const userRouter = Router();

userRouter.post("/signup", Register)
userRouter.post("/signin", Login)
userRouter.post("/google-auth", GoogleAuth)