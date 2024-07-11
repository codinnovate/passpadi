import express from 'express';
import { CreatePost } from '../controllers/Post.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

const PostRouter = express.Router()

PostRouter.post('/create-post', verifyJWT, CreatePost)
// PostRouter.get('/:postId', getPost)


export default PostRouter