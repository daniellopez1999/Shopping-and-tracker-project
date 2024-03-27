import express from 'express';
import { Products } from '../controllers/products';

const productsRouter = express.Router();

productsRouter.post('/', Products.createProduct);

export default productsRouter;
