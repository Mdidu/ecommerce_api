import jwt from "jsonwebtoken";
import * as express from 'express';
import { ERROR_TOKEN, INVALID_TOKEN, TOKEN_IS_MISSING } from "../store/error_messages";

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ errors: TOKEN_IS_MISSING });

  try {
    const token = authorization.split(" ")[1];

    if(process.env.JWT_SECRET_KEY === undefined) throw Error(ERROR_TOKEN)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret);

    req.body.user = decodedToken;

    next();
  } catch (error) {
    if(error instanceof Error) res.status(401).json({ errors: `${INVALID_TOKEN}${error.message}` });
  }
};

export default authMiddleware;