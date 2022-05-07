import * as jwt from 'jsonwebtoken';
import { UserDto } from '../models/dto/User.dto';

export const createTokenJWT = ({id, email, firstName, lastName, roleId}: UserDto) => {
  const isAdmin = roleId === 2 ? true : false;
  const createdAt = new Date();

  return jwt.sign(
    { id: id, email, firstName, lastName, admin: isAdmin, createdAt },
    process.env.JWT_SECRET_KEY as jwt.Secret,
    { expiresIn: "24h" }
  );
};