import {Router} from 'express';
import { addProduct } from '../controllers/Product.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

export const productRouter = Router()
productRouter.post('/add-product', verifyJWT,  addProduct)


