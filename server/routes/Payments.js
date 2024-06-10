import express, { Router } from 'express';
import { VerifyTransaction, initTransaction } from '../controllers/Payments.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

export const paymentRouter = Router();
paymentRouter.post('/pay', verifyJWT, initTransaction)
paymentRouter.get('/verify/:reference', VerifyTransaction)