import express, { Router } from 'express';
import {getTransactions, initTransaction,verifyTransaction } from '../controllers/Payments.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';

export const paymentRouter = Router();
paymentRouter.post('/pay', verifyJWT, initTransaction)
paymentRouter.post('/verify', verifyJWT, verifyTransaction)
paymentRouter.get('/', verifyJWT, getTransactions);
