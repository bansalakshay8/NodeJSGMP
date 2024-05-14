import { Router } from "express";
import * as AuthController from '../controllers/auth.controller.ts';
export const AuthRoutes = Router();

AuthRoutes.post('/register', AuthController.register);
AuthRoutes.post('/login', AuthController.login);