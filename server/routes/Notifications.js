import express from 'express';
import { getNotifs } from '../controllers/Notification.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

const Notifs = express.Router();
Notifs.get("/", verifyJWT, getNotifs);

export default Notifs