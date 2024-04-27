import express from 'express';
import { Products } from '../controllers/products';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const productsRouter = express.Router();

productsRouter.get('/all', Products.getAllProducts);
productsRouter.get('/products-type', Products.findProductsByType);
productsRouter.get('/all-products-type', Products.findAllProductTypes);
productsRouter.get('/:id', Products.getById);
productsRouter.post('/create-product', isAuthenticated, Products.createProduct);
productsRouter.patch('/buy', isAuthenticated, Products.buyProducts);
productsRouter.post(
  '/create-products-template',
  Products.createProductsTemplate
);
productsRouter.post(
  '/bulk-products',
  upload.single('csvFile'),
  Products.createProductsBulk
);

export default productsRouter;
