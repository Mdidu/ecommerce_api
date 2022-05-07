import * as authService from './../services/auth';
import * as express from 'express';
import * as bcrypt from "bcrypt";
import { UserDto } from '../models/dto/User.dto';

export const login = async (req: express.Request, res: express.Response) => {
  const {status, data, token} = await authService.login(req.body)
  if(status.codeStatus === 401) res.status(status.codeStatus).json({ message: status.message });

  return res.status(status.codeStatus).json({message: status.message, user: data, token: token});
} 

export const signup = async (req: express.Request, res: express.Response) => {
  const userDto: UserDto = req.body;
  const hashPassword: string = await bcrypt.hash(userDto.password, 10);
  const roleId = 1;
  const validate = false;

  userDto.password = hashPassword;
  userDto.validate = validate;
  userDto.roleId = roleId;

  const {codeStatus, message} = await authService.signup(userDto)

  return res.status(codeStatus).json({ message });
} 

export const validateAccount = async (req: express.Request, res: express.Response) => {
  const email: string = req.params.email;

  const { codeStatus, message } = await authService.validateAccount(email);

  res.status(codeStatus).json({ message });
};