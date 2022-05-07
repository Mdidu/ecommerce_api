import express from 'express';
import * as productController from '../controllers/product';
import authMiddleware from '../middlewares/auth';

const productRoutes = express.Router();

productRoutes.get('/', productController.getAllProduct);
productRoutes.get('/read/:id', productController.getOneProduct);
productRoutes.post('/new', [authMiddleware], productController.addProduct);
productRoutes.put('/update/:id', [authMiddleware], productController.updateProduct);
productRoutes.delete('/delete/:id', [authMiddleware], productController.deleteProduct);

export default productRoutes;