import express from 'express';
import { Products } from '../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/all', Products.getAllProducts);
productsRouter.get('/:id', Products.getById);
productsRouter.post('/create-product', Products.createProduct);

export default productsRouter;
