import { CREATED_SUCESSFULLY, DATA_OBTAINED, DELETED_SUCESSFULLY, UPDATED_SUCESSFULLY } from './../store/success_messages';
import { ProductCategoryDao } from './../models/dao/ProductCategory.dao';
import { ProductCategoryDto } from './../models/dto/ProductCategory.dto';
import * as productCategoryRepository from '../repository/ProductCategory';
import { CREATED_FAILED, DELETED_FAILED, NO_DATA, UPDATED_FAILED } from '../store/error_messages';
import { ProductCategoryResponse } from '../type/ProductCategoryResponse';

let response: ProductCategoryResponse;

export const addProductCategory = async (productCategoryDto: ProductCategoryDto) => {
  const productCategoryDao = convertProductCategoryDtoInProductCategoryDao(productCategoryDto);

  try {
    const result = await productCategoryRepository.addCategory(productCategoryDao);

    if(result.rowCount === 0) throw Error(CREATED_FAILED)

    const productCategoryId = result.rows[0];
    
    response = {codeStatus: 201, message: CREATED_SUCESSFULLY, value: productCategoryId};
  } catch (error) {
    if(error instanceof Error) response = { codeStatus: 400, message: error.message}; 
  }
  return response;
}

export const getAllCategory = async () => {
  const categoryDaoList: Array<ProductCategoryDao> = await (await productCategoryRepository.findAll()).rows;

  const categoryDtoList = categoryDaoList.map((category: ProductCategoryDao) => convertProductCategoryDaoInProductCategoryDto(category));

  if(categoryDtoList.length > 0) response = { codeStatus: 200, message: DATA_OBTAINED, value: categoryDtoList};
  else response = { codeStatus: 200, message: NO_DATA, value: categoryDtoList};

  return response;
}

export const updateProductCategory = async (productCategoryDto: ProductCategoryDto) => {
  const productCategoryDao = convertProductCategoryDtoInProductCategoryDao(productCategoryDto);

  try {
    const result = await productCategoryRepository.updateCategoryName(productCategoryDao);

    if(result.rowCount === 0) throw Error(UPDATED_FAILED);

    response = { codeStatus: 201, message: UPDATED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) response = { codeStatus: 401, message: error.message}; 
  }

  return response;
}

export const deleteProductCategory = async (id: number) => {
  try {
    const result = await productCategoryRepository.deleteCategory(id);
    
    if(result.rowCount === 0) throw Error(DELETED_FAILED);

    response = { codeStatus: 401, message: DELETED_SUCESSFULLY}; 
  } catch (error) {
    if(error instanceof Error) response = { codeStatus: 401, message: error.message}; 
  }

  return response;
}

export const convertProductCategoryDaoInProductCategoryDto = (productCategoryDao: ProductCategoryDao): ProductCategoryDto => {
  return {
    id: +productCategoryDao.id,
    productCategoryName: productCategoryDao.productCategoryName,
  }
}

export const convertProductCategoryDtoInProductCategoryDao = (productCategoryDto: ProductCategoryDto): ProductCategoryDao => {
  return {
    id: +productCategoryDto.id,
    productCategoryName: productCategoryDto.productCategoryName,
  }
}