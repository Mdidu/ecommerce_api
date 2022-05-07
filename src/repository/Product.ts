import { ProductDao } from './../models/dao/Product.dao';
import db from '../utils/database';

export const addProduct = async ({product_price, product_name, product_description, category_id, inventory_id, created_at}: ProductDao) => {
  return await db.query('INSERT INTO product (product_price, product_name, product_description, category_id, inventory_id, product_created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [product_price, product_name, product_description, category_id, inventory_id, created_at]);
};

export const findAll = async () => {
  return await db.query('SELECT * FROM product');
}

export const findOneById = async (id: number) => {
  return await db.query('SELECT * FROM product WHERE id = $1 LIMIT 1', [id]);
}

export const updateProduct = async ({product_price, product_name, product_description}: ProductDao) => {
  return await db.query('UPDATE product SET product_price = $1, product_name = $2, product_description = $3 WHERE product_name = $2', [product_price, product_name, product_description]);
};

export const updateProductNameAndDescription = async ({product_name, product_description, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_name = $1, product_description = $2 WHERE id = $3', [product_name, product_description, id]);
};

export const updateProductPriceAndName = async ({product_price, product_name, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_price = $1, product_name = $2 WHERE id = $3', [product_price, product_name, id]);
};

export const updateProductPriceAndDescription = async ({product_price, product_description, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_price = $1, product_description = $2 WHERE id = $3', [product_price, product_description, id]);
};
export const updateProductPrice = async ({product_price, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_price = $1 WHERE id = $2', [product_price, id]);
};

export const updateProductName = async ({product_name, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_name = $1 WHERE id = $2', [product_name, id]);
};

export const updateProductDescription = async ({product_description, id}: ProductDao) => {
  return await db.query('UPDATE product SET product_description = $1 WHERE id = $2', [product_description, id]);
};

export const deleteProduct = async (id: number) => {
  return await db.query('DELETE FROM product WHERE id = $1', [id]);
};