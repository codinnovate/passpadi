import { Router } from "express";
import { GoogleAuth, Register, Login, getMyProfile, deleteUser, activateUser, getProfile } from "../controllers/User.js";
import { verifyJWT } from "../middlewares/VerifyJwt.js";

export const userRouter = Router();

userRouter.post("/signup", Register)
          .post("/signin", Login)
          .post("/google-auth", GoogleAuth)
          .get('/profile',   verifyJWT, getMyProfile)
          .delete('/user/delete/:id', verifyJWT, deleteUser)
          .put('/user/activate/:id', activateUser)
          .post('/get-profile', getProfile)
