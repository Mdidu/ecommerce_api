import { QueryResult } from 'pg';
import { ProductDao } from './../models/dao/Product.dao';
import { ProductDto } from './../models/dto/Product.dto';
import * as productRepository from '../repository/Product';
import { ProductResponse } from '../type/ProductResponse';
import { CREATED_SUCESSFULLY, DATA_OBTAINED, DELETED_SUCESSFULLY, UPDATED_SUCESSFULLY } from '../store/success_messages';
import { CREATED_FAILED, DELETED_FAILED, NO_DATA, UPDATED_FAILED } from '../store/error_messages';
import Status from '../type/status';

let productResponse: ProductResponse;
let status: Status;
let result: QueryResult<any>;

export const addProduct = async (productDto: ProductDto) => {
  const productDao = convertProductDtoInProductDao(productDto);

  try {
    const result = await productRepository.addProduct(productDao);

    if(result.rowCount === 0) throw Error(CREATED_FAILED)

    const productId = result.rows[0];
    
    return {codeStatus: 201, message: CREATED_SUCESSFULLY, value: productId};
  } catch (error) {
    if(error instanceof Error) productResponse = { codeStatus: 400, message: error.message}; 
  }
  
  return productResponse;
} 

export const getAllProduct = async () => {
  const productDaoList: Array<ProductDao> = await (await productRepository.findAll()).rows;

  const productDtoList = productDaoList.map((product: ProductDao) => convertProductDaoInProductDto(product));

  if(productDtoList.length > 0) productResponse = {codeStatus: 200, message: DATA_OBTAINED, value: productDtoList};
  else productResponse = {codeStatus: 200, message: NO_DATA, value: productDtoList};
  return productResponse;
} 

export const getOneProduct = async (id: number) => {
  const productDao: ProductDao = await (await productRepository.findOneById(id)).rows[0];
  try {
    const productDto = convertProductDaoInProductDto(productDao);
    productResponse = {codeStatus: 200, message: DATA_OBTAINED, value: productDto};
  } catch (error) {
    if(error instanceof Error) productResponse = { codeStatus: 401, message: error.message}; 
  }

  return productResponse;
}

export const updateProduct = async (productDto: ProductDto) => {
  const productDao = convertProductDtoInProductDao(productDto);

  const productNameIsNotMissing = typeof productDto.productName !== 'undefined' && productDto.productName !== '';
  const productDescriptionIsNotMissing = typeof productDto.productDescription !== 'undefined' && productDto.productDescription !== '';
  const productPriceIsNotMissing = typeof productDto.productPrice !== 'undefined' && productDto.productPrice > 0;
  
  try {
    if(productNameIsNotMissing && productDescriptionIsNotMissing && productPriceIsNotMissing)                 
      result = await productRepository.updateProduct(productDao);
    else if(productNameIsNotMissing && productDescriptionIsNotMissing)
      result = await productRepository.updateProductNameAndDescription(productDao);
    else if(productPriceIsNotMissing && productDescriptionIsNotMissing)
      result = await productRepository.updateProductPriceAndDescription(productDao);
    else if(productPriceIsNotMissing && productNameIsNotMissing)
      result = await productRepository.updateProductPriceAndName(productDao);
    else if(productPriceIsNotMissing)
      result = await productRepository.updateProductPrice(productDao);
    else if(productNameIsNotMissing)
      result = await productRepository.updateProductName(productDao);
    else if(productDescriptionIsNotMissing)
      result = await productRepository.updateProductDescription(productDao);

    if(result.rowCount === 0) throw Error(UPDATED_FAILED);

    status = { codeStatus: 201, message: UPDATED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) status = { codeStatus: 401, message: error.message}; 
  }
  
  return status;
} 

export const deleteProduct = async (id: number) => {
  try {
    const result = await productRepository.deleteProduct(id);

    if(result.rowCount === 0) throw Error(DELETED_FAILED);

    status = { codeStatus: 401, message: DELETED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) status = { codeStatus: 401, message: error.message}; 
  }
  
  return status;
} 

export const convertProductDaoInProductDto = (productDao: ProductDao): ProductDto => {
  return {
    id: +productDao.id,
    productName: productDao.product_name, 
    productDescription: productDao.product_description, 
    productPrice: productDao.product_price,
    createdAt: productDao.created_at,
    categoryId: +productDao.category_id,
    inventoryId: +productDao.inventory_id,
    discountId: productDao.discount_id !== undefined ? +productDao.discount_id : undefined
  }
}

export const convertProductDtoInProductDao = (productDto: ProductDto): ProductDao => {
  return {
    id: +productDto.id,
    product_name: productDto.productName, 
    product_description: productDto.productDescription, 
    product_price: productDto.productPrice,
    created_at: productDto.createdAt,
    category_id: +productDto.categoryId,
    inventory_id: +productDto.inventoryId,
    discount_id: productDto.discountId !== undefined ? +productDto.discountId : undefined
  }
}