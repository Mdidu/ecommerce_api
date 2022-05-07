import { ProductInventoryDao } from './../models/dao/ProductInventory.dao';
import db from '../utils/database';

export const addProductWithInventory = async ({quantity, createdAt}: ProductInventoryDao) => {
  return await db.query('INSERT INTO product_inventory (quantity, created_at) VALUES ($1, $2)', [quantity, createdAt]);
};

export const findAll = async () => {
  return await db.query('SELECT * FROM product_inventory');
}

export const findOneById = async ({id}: ProductInventoryDao) => {
  return await db.query('SELECT * FROM product_inventory WHERE id = $1 LIMIT 1', [id]);
}

export const updateQuantity = async ({id, quantity, modifiedAt}: ProductInventoryDao) => {
  return await db.query('UPDATE product_inventory SET quantity = $1, modified_at = $2 WHERE id = $3', [quantity, modifiedAt, id])
};

export const deleteProductQuantity = async ({id}: ProductInventoryDao) => {
  return await db.query('DELETE FROM product_inventory WHERE id = $1', [id]);
};