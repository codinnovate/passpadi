import {Router} from 'express';
import { addProduct, getProduct, singleProduct } from '../controllers/Product.js';
import { verifyJWT } from '../middlewares/VerifyJwt.js';

export const productRouter = Router()
productRouter.post('/add-product',  verifyJWT, addProduct)
productRouter.get('/get-product',   getProduct)
productRouter.post('/product',   singleProduct)


