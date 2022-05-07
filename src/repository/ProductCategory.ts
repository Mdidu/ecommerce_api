import db from '../utils/database';
import { ProductCategoryDao } from './../models/dao/ProductCategory.dao';

export const addCategory = async ({productCategoryName}: ProductCategoryDao) => {
  return await db.query('INSERT INTO product_category (product_category_name) VALUES ($1) RETURNING id', [productCategoryName]);
}

export const findAll = async () => {
  return await db.query('SELECT * FROM product_category');
}

export const findOneByName = async ({productCategoryName}: ProductCategoryDao) => {
  return await db.query('SELECT * FROM product_category WHERE product_category_name = $1 LIMIT 1', [productCategoryName]);
}

export const updateCategoryName = async ({productCategoryName, id}: ProductCategoryDao) => {
  return await db.query('UPDATE product_category SET product_category_name = $1 WHERE id = $2', [productCategoryName, id]);
}

export const deleteCategory = async (id: number) => {
  return await db.query('DELETE FROM product_category WHERE id = $1', [id]);
}