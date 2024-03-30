import express from 'express';
import { Products } from '../controllers/products';

const productsRouter = express.Router();

productsRouter.get('/all', Products.getAllProducts);
productsRouter.get('/:id', Products.getById);
productsRouter.post('/create-product', Products.createProduct);
productsRouter.patch('/buy', Products.buyProducts);

export default productsRouter;
