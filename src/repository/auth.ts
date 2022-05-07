import { UserDao } from './../models/dao/User.dao';
import db from "./../utils/database";

export const login = async ({email}: UserDao) => {
  return await findOneByEmail(email);
};

export const signup = async ({email, password, firstName, lastName, roleId, validate}: UserDao) => {
  return await db.query(
    `INSERT INTO user_entity(email, password, first_name, last_name, role_id, validate) VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, password, firstName, lastName, roleId, validate]
  );
};

export const getExistBeforeSignup = async ({email}: UserDao) => {
  return await findOneByEmail(email);
};

export const findOneByEmail = async (email: string) => {
  return await db.query(`SELECT * FROM user_entity WHERE email = $1 LIMIT 1`, [
    email,
  ]);
};

export const updateUserValidate = async (email: string, validate: boolean) => {
  return await db.query(
    `UPDATE user_entity SET validate = $1 WHERE email = $2`,
    [validate, email]
  );
};