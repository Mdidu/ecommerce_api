import * as productCategoryService from './../services/product-category';
import { ProductCategoryDto } from './../models/dto/ProductCategory.dto';
import * as express from 'express';
import { UNAUTHORIZED } from '../store/error_messages';

export const addProductCategory = async (req: express.Request, res: express.Response) => {
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const productCategoryDto: ProductCategoryDto = {
    id: 0,
    productCategoryName: req.body.categoryName,
  };

  const { codeStatus, message, value } = await productCategoryService.addProductCategory(productCategoryDto);

  codeStatus === 201 
  ? res.status(codeStatus).json({ message, categoryId: value })
  : res.status(codeStatus).json({ message });
}

export const getAllProductCategory = async (req: express.Request, res: express.Response) => {
  const {codeStatus, message, value} = await productCategoryService.getAllCategory();

  res.status(codeStatus).json({message, value});
}

export const updateProductCategory = async (req: express.Request, res: express.Response) => {
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const productCategoryDto: ProductCategoryDto = {
    id: +req.params.id,
    productCategoryName: req.body.categoryName
  };

  const {codeStatus, message} = await productCategoryService.updateProductCategory(productCategoryDto);
  
  return res.status(codeStatus).json({message});
}

export const deleteProductCategory = async (req: express.Request, res: express.Response) => {
  const { admin } = req.body.user;
  const id = +req.params.id;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const { codeStatus, message } = await productCategoryService.deleteProductCategory(id);

  return res.status(codeStatus).json({message});
}