import { ProductInventoryDao } from './../models/dao/ProductInventory.dao';
import { CREATED_FAILED, DELETED_FAILED, UPDATED_FAILED } from '../store/error_messages';
import { CREATED_SUCESSFULLY, DELETED_SUCESSFULLY, UPDATED_SUCESSFULLY } from '../store/success_messages';
import * as productInventoryRepository from '../repository/ProductInventory';
import { ProductInventoryDto } from './../models/dto/ProductInventory.dto';
import { ProductInventoryResponse } from '../type/ProductInventoryResponse';

let response: ProductInventoryResponse;
let responseProductInventoryId: number | undefined;

export const addProductInventory = async (productInventoryDto: ProductInventoryDto) => {
  const productInventoryDao = convertProductInventoryDtoInProductInventoryDao(productInventoryDto);

  try {
    const result = await productInventoryRepository.addProductWithInventory(productInventoryDao);

    if(result.rowCount === 0) throw Error(CREATED_FAILED)

    const productInventoryId: number = result.rows[0].id;
    
    responseProductInventoryId = productInventoryId;
  } catch (error) {
    if(error instanceof Error) responseProductInventoryId = undefined; 
  }
  return responseProductInventoryId;
}

export const updateProductInventory = async (productInventoryDto: ProductInventoryDto) => {
  const productInventoryDao = convertProductInventoryDtoInProductInventoryDao(productInventoryDto);

  try {
    const result = await productInventoryRepository.updateQuantity(productInventoryDao);

    if(result.rowCount === 0) throw Error(UPDATED_FAILED);

    response = { codeStatus: 201, message: UPDATED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) response = { codeStatus: 401, message: error.message}; 
  }
  return response;
}

export const deleteProductInventory = async (id: number) => {
  try {
    const result = await productInventoryRepository.deleteProductQuantity(id);

    if(result.rowCount === 0) throw Error(DELETED_FAILED);

    response = { codeStatus: 401, message: DELETED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) response = { codeStatus: 401, message: error.message}; 
  }
  return response;
}

export const convertProductInventoryDaoInProductInventoryDto = (productInventoryDao: ProductInventoryDao): ProductInventoryDto => {
  return {
    id: +productInventoryDao.id,
    quantity: productInventoryDao.quantity,
    createdAt: productInventoryDao.createdAt,
    modifiedAt: productInventoryDao.modifiedAt,
  }
}

export const convertProductInventoryDtoInProductInventoryDao = (productInventoryDto: ProductInventoryDto): ProductInventoryDao => {
  return {
    id: +productInventoryDto.id,
    quantity: productInventoryDto.quantity,
    createdAt: productInventoryDto.createdAt,
    modifiedAt: productInventoryDto.modifiedAt,
  }
}