import { ProductInventoryDto } from './../models/dto/ProductInventory.dto';
import * as productInventoryService from './../services/product-inventory';
import * as express from 'express';
import { UNAUTHORIZED } from '../store/error_messages';

export const updateProductInventory = async (req: express.Request, res: express.Response) => {
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const modifiedAt = new Date();

  const productInventoryDto: ProductInventoryDto = {
    id: +req.params.id,
    quantity: +req.body.quantity,
    createdAt: undefined,
    modifiedAt
  }

  const {codeStatus, message} = await productInventoryService.updateProductInventory(productInventoryDto);

  res.status(codeStatus).json({message});
}

export const deleteProductInventory = async (req: express.Request, res: express.Response) => {
  const id = +req.params.id;
  const { admin } = req.body.user;

  if (!admin) res.status(403).json({message: UNAUTHORIZED});

  const {codeStatus, message} = await productInventoryService.deleteProductInventory(id);

  res.status(codeStatus).json({message});
}

