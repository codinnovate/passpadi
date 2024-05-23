import express, { Router } from "express";
import { verifyJWT } from "../middlewares/VerifyJwt.js";
import { addComment, getComment } from "../controllers/Comment.js";


export const commentRouter = Router()

commentRouter.post("/add-comment", verifyJWT, addComment)
commentRouter.post("/get-blog-comments", getComment)
