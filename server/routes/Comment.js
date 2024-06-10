import express, { Router } from "express";
import { verifyJWT } from "../middlewares/VerifyJwt.js";
import { addComment, getComment, getReplies } from "../controllers/Comment.js";


export const commentRouter = Router()

commentRouter.post("/add-comment", verifyJWT, addComment)
commentRouter.post("/get-blog-comments", getComment)
commentRouter.post("/get-replies",  getReplies)
