import { Router } from "express";
import { countPost, draftPost, latestPost, searchPost, trendingPost, createBlog } from "../controllers/Blog.js";
import { verifyJWT } from "../middlewares/VerifyJwt.js";


export const blogRouter = Router();

blogRouter.post('/latest-blogs', latestPost)
            .post('/search-blogs', searchPost)
            .get('/trending-blogs', trendingPost)
            .post('/search-blogs-count', countPost)
            .post('/drafts', draftPost)
//          .post('/search-users', usersPost)
            .post('/create-blog',verifyJWT, createBlog)