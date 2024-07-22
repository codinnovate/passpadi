import express from 'express';
import { CreatePost, EditPost, DeletePost, getPosts, getSinglePost } from '../controllers/Post.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

const PostRouter = express.Router()

PostRouter.post('/create-post', verifyJWT, CreatePost)
PostRouter.put('/edit-post', verifyJWT, EditPost);
PostRouter.delete('/delete-post', verifyJWT, DeletePost);
PostRouter.get("/get-posts", getPosts);
PostRouter.get("/post/:postId", getSinglePost);
export default PostRouter