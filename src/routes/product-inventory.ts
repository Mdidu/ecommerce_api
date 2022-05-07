import express from 'express';
import * as productInventoryController from '../controllers/product-inventory';
import authMiddleware from '../middlewares/auth';

const inventoryRoutes = express.Router();

inventoryRoutes.put('/update/:id', [authMiddleware], productInventoryController.updateProductInventory);
inventoryRoutes.delete('/delete/:id', [authMiddleware], productInventoryController.deleteProductInventory);

export default inventoryRoutes;