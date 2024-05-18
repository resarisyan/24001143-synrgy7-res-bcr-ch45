import express from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { CheckRole } from '../../middlewares/check-role-middleware';
import { AdminRentalController } from '../../controllers/admin/admin-rental-controller';
export const adminRentalRouter = express.Router();

adminRentalRouter.use(authMiddleware);
adminRentalRouter.use(CheckRole.isAdmin);
adminRentalRouter.get('/', AdminRentalController.getAll);
adminRentalRouter.get('/:id', AdminRentalController.getById);
