import { Router } from "express";
import { countPost, draftPost, latestPost, searchPost, trendingPost } from "../controllers/Blog.js";


export const postRouter = Router();

postRouter.post('/latest-blogs', latestPost)
postRouter.post('/search-blogs', searchPost)
postRouter.post('/trending-blogs', trendingPost)
postRouter.post('/search-blogs-count', countPost)
postRouter.post('/drafts', draftPost)
// postRouter.post('/search-users', usersPost)
postRouter.post('/create-blog')