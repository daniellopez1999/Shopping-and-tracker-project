import express from 'express';
import { Products } from '../controllers/products';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const productsRouter = express.Router();

productsRouter.get('/all', Products.getAllProducts);
productsRouter.get('/products-type/:type', Products.findProductsByType);
productsRouter.get('/:id', Products.getById);
productsRouter.post('/create-product', isAuthenticated, Products.createProduct);
productsRouter.patch('/buy', isAuthenticated, Products.buyProducts);
productsRouter.post(
  '/create-products-template',
  Products.createProductsTemplate
);

export default productsRouter;
