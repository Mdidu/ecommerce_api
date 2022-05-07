import { DiscountDao } from './../models/dao/Discount.dao';
import db from '../utils/database';

export const addDiscount = async ({discountName, discountDescription, discountPercent, active, createdAt}: DiscountDao) => {
  return db.query('INSERT INTO discount (discount_name, discount_description, discount_percent, acitve, created_at)', [discountName, discountDescription, discountPercent, active, createdAt]);
};

export const findAll = async () => {
  return await db.query('SELECT * FROM discount');
};

export const findOneById = async ({id}: DiscountDao) => {
  return await db.query('SELECT * FROM discount WHERE id = $1 LIMIT 1', [id]);
};

export const updatePercent = async ({discountPercent, id}: DiscountDao) => {
  return await db.query('UPDATE discount SET discount_percent = $1 WHERE id = $2', [discountPercent, id]);
};

export const deleteDiscount = async ({id}: DiscountDao) => {
  return await db.query('DELETE FROM discount WHERE id = $1', [id]);
};