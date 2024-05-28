import express from "express";
import { getMessages , newMessage } from "../controllers/Messages";
const router = express.Router();
router.post('/new', newMessage)
router.get('/sync', getMessages)


export default router ;