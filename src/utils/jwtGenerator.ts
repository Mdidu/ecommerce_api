import * as jwt from 'jsonwebtoken';
import { UserDto } from '../models/dto/User.dto';

export const createTokenJWT = ({id, email, firstName, lastName, roleId}: UserDto) => {
  const isAdmin = roleId === 2 ? true : false;
  const createdAt = new Date();
  
  if(process.env.JWT_SECRET_KEY === undefined) return;
  console.log(firstName, lastName, roleId)

  return jwt.sign(
    { id: id, email, firstName, lastName, admin: isAdmin, createdAt },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
};