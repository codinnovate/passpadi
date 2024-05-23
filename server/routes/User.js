import { Router } from "express";
import { GoogleAuth, Register, Login } from "../controllers/User.js";

export const userRoutes = Router();

userRoutes.post("/signup", Register)
userRoutes.post("/signin", Login)
userRoutes.post("/google-auth", GoogleAuth)