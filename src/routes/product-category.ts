import express from 'express';
import * as productCategoryController from '../controllers/product-category';
import authMiddleware from '../middlewares/auth';

const categoryRoutes = express.Router();

categoryRoutes.get('/', productCategoryController.getAllProductCategory);
categoryRoutes.post('/new', [authMiddleware], productCategoryController.addProductCategory);
categoryRoutes.put('/update/:id', [authMiddleware], productCategoryController.updateProductCategory);
categoryRoutes.delete('/delete/:id', [authMiddleware], productCategoryController.deleteProductCategory);

export default categoryRoutes;