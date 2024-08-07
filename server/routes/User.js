import { Router } from "express";
import { GoogleAuth, Register, Login, getMyProfile, deleteUser, activateUser } from "../controllers/User.js";
import { verifyJWT } from "../middlewares/VerifyJwt.js";

export const userRouter = Router();

userRouter.post("/signup", Register)
userRouter.post("/signin", Login)
userRouter.post("/google-auth", GoogleAuth)
userRouter.get('/profile',   verifyJWT, getMyProfile)
userRouter.delete('/user/delete/:id', verifyJWT, deleteUser)
userRouter.put('/user/activate/:id', activateUser)
