import express from 'express';
import { AuthController } from '../controllers/auth-controller';
import { authMiddleware } from '../middlewares/auth-middleware';
export const authRouter = express.Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/logout', authMiddleware, AuthController.logout);
