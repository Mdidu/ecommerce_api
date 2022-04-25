import { sendMail } from './../utils/sendMail';
import * as authRepository from './../repository/auth';
import { UserDao } from './../models/dao/User.dao';
import { UserDto } from "../models/dto/User.dto";
import { UserReducedData } from '../models/dto/UserReducedData.dto';
import Status from '../type/status';
import * as bcrypt from "bcrypt";
import { ACCOUNT_ALREADY_VALIDATE, ACCOUNT_NOT_VALIDATE, ACCOUNT_UNKNOWN, CREATED_ACCOUNT_FAILED, EMAIL_ALREADY_USED, FIRST_AND_LAST_NAME_ARE_MISSING, FIRST_NAME_IS_MISSING, INCORRECT_EMAIL_OR_PASSWORD, LAST_NAME_IS_MISSING, RANDOM_ERROR, UPDATED_FAILED } from '../store/error_messages';
import { CREATED_ACCOUNT_SUCCESSFULLY, VALIDATE_ACCOUNT_SUCCESSFULLY } from '../store/success_messages';
import { QueryResult } from 'pg';
import { createTokenJWT } from '../utils/jwtGenerator';

let status: Status;
type ResponseService = {
  status: Status;
  data: unknown | undefined;
  token: string | undefined;
}
let response: ResponseService;

export const login = async (userDto: UserDto): Promise<ResponseService> => {
  status = {
    codeStatus: 200,
    message: "Login sucessfully",
  };
  let roleName = "User";

  const userDao: UserDao = userDto;
  const result =  (await authRepository.login(userDao)).rows[0];
  const user: UserDao =  {id: result.id, email: result.email, password: result.password, firstName: result.first_name, lastName: result.last_name, phoneNumber: result.phone_number, validate: result.validate, roleId: result.role_id};
  const passwordValid = await bcrypt.compare(userDao.password, user.password);
  
  if(!identifierIsValid(user, passwordValid)) return response;

  if(accountNotValidate(user)) return response;
  
  if (user !== undefined && user.roleId === 2) roleName = "Admin";

  const userReduced: UserReducedData = new UserReducedData(user.email, user.firstName, user.lastName, user.phoneNumber, user.validate, roleName);

  const token = createTokenJWT(
    user
  );

  response = {status, data: userReduced, token};
  return response;
};

export const signup = async (userDto: UserDto): Promise<Status> => {
  status = { codeStatus: 201, message: CREATED_ACCOUNT_SUCCESSFULLY};

  if(checkNameIsMissing(userDto)) return status;

  const userDao: UserDao = userDto;

  if(await getExistBeforeSignup(userDao)) return status;
  
  try {
    const result = await authRepository.signup(userDao);

    if(createdAccountIsFailed(result)) return status;
    
    sendMail(userDto.email, userDto.firstName, userDto.lastName);

    return status;
  } catch (error) {
    status = { codeStatus: 401, message: RANDOM_ERROR };

    if(error instanceof Error) status = { codeStatus: 401, message: error.message };
    
    return status;
  }
};

export const validateAccount = async (email: string): Promise<Status> => {
  status = { codeStatus: 200, message: VALIDATE_ACCOUNT_SUCCESSFULLY};
  const userDao: UserDao = (await authRepository.findOneByEmail(email)).rows[0];

  if(typeIsUndefined(userDao)) return status;

  if(alreadyValidateAccount(userDao)) return status;

  const updatedValidateAccount = await authRepository.updateUserValidate(
    email,
    true
  );

  if (updatedValidateAccount.rowCount === 0) status = { codeStatus: 401, message: UPDATED_FAILED };

  return status;
};

/** 
 * Checking functions 
 * */
const identifierIsValid = (user: UserDao, passwordValid: boolean): boolean => {
  if(user === undefined || !passwordValid) {
    const status = { codeStatus: 401, message: INCORRECT_EMAIL_OR_PASSWORD };
    response = {status, data: undefined, token: undefined};
    return false;
  }
  return true;
};

const accountNotValidate = (user: UserDao): boolean => {
  if (!user.validate) {
    sendMail(user.email, user.firstName, user.lastName);
    const status = {
      codeStatus: 401,
      message: ACCOUNT_NOT_VALIDATE,
    };
    
    response = {status, data: undefined, token: undefined};
    return true;
  }
  return false;
};

const checkNameIsMissing = (userDto: UserDto): boolean => {

  if(userDto.firstName === undefined && userDto.lastName === undefined) { 
    status = { codeStatus: 401, message: FIRST_AND_LAST_NAME_ARE_MISSING} 
    return true
  } if(userDto.firstName === undefined) {
    status = { codeStatus: 401, message: FIRST_NAME_IS_MISSING} 
    return true;
  } if(userDto.lastName === undefined) {
    status = { codeStatus: 401, message: LAST_NAME_IS_MISSING} 
    return true;
  }

  return false;
};

const getExistBeforeSignup = async (userDao: UserDao) => {
  const user: UserDao = (await authRepository.getExistBeforeSignup(userDao)).rows[0];

  if (user !== undefined && user.email === userDao.email) {
    status = { codeStatus: 401, message: EMAIL_ALREADY_USED};
    return true;
  }

  return false;
};

const createdAccountIsFailed = (result: QueryResult<any>): boolean => {
  if(result.rowCount === 0) {
    status = { codeStatus: 401, message: CREATED_ACCOUNT_FAILED};
    return true;
  }
  return false;
}


const typeIsUndefined = (userDao: UserDao): boolean => {
  if (typeof userDao === 'undefined') {
    status = { codeStatus: 401, message: ACCOUNT_UNKNOWN};
    return true;
  }
  return false;
}

const alreadyValidateAccount = (userDao: UserDao): boolean => {
  if (userDao.validate) {
    status = { codeStatus: 401, message: ACCOUNT_ALREADY_VALIDATE};
    return true;
  }
  return false;
};