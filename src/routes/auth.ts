// import { validateAccount } from './../services/auth';
import express from 'express';
import * as authController from '../controllers/auth';

const authRoutes = express.Router();

authRoutes.post("/signin", authController.login)
authRoutes.post("/signup", authController.signup)
authRoutes.get("/validate/:email", authController.validateAccount)

export default authRoutes;