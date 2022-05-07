import { ProductInventoryDto } from './../models/dto/ProductInventory.dto';
import { ProductDto } from './../models/dto/Product.dto';
import * as express from 'express';
import * as productService from '../services/product';
import { CREATED_INVENTORY_FAILED, UNAUTHORIZED } from '../store/error_messages';
import * as productInventoryService from '../services/product-inventory';

export const addProduct = async (req: express.Request, res: express.Response) => {  
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const createdAt = new Date();
  const productInventoryDto: ProductInventoryDto = {
    id: -1,
    quantity: req.body.quantity,
    createdAt,
    modifiedAt: undefined
  }
  
  const inventoryId = await productInventoryService.addProductInventory(productInventoryDto);

  if(inventoryId === undefined) return res.status(400).json({message: CREATED_INVENTORY_FAILED});

  const productDto: ProductDto = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    createdAt,
    categoryId: req.body.categoryId,
    inventoryId: +inventoryId,
    discountId: undefined,
    id: -1
  };

  const {codeStatus, message, value} = await productService.addProduct(productDto);

  codeStatus === 201 
  ? res.status(codeStatus).json({ message, articleId: value })
  : res.status(codeStatus).json({ message });
} 

export const getAllProduct = async (req: express.Request, res: express.Response) => {
  const {codeStatus, message, value} = await productService.getAllProduct();

  res.status(codeStatus).json({message, value});
} 

export const getOneProduct = async (req: express.Request, res: express.Response) => {
  const productId = +req.params.id;

  const {codeStatus, message, value} = await productService.getOneProduct(productId);
  
  res.status(codeStatus).json({message, value});
} 

export const updateProduct = async (req: express.Request, res: express.Response) => {
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const productDto: ProductDto = {
    id: +req.params.id,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    createdAt: undefined,
    categoryId: req.body.categoryId,
    inventoryId: req.body.inventoryId,
    discountId: undefined,
  };

  const {codeStatus, message} = await productService.updateProduct(productDto);
  
  return res.status(codeStatus).json({message});
} 

export const deleteProduct = async (req: express.Request, res: express.Response) => {
  const id = +req.params.id;
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const { codeStatus, message } = await productService.deleteProduct(id);

  return res.status(codeStatus).json({message});
} 