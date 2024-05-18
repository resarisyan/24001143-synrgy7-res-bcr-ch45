import express from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { CheckRole } from '../../middlewares/check-role-middleware';
import { AdminPaymentController } from '../../controllers/admin/admin-payment-controller';
export const adminPaymentRouter = express.Router();

adminPaymentRouter.use(authMiddleware);
adminPaymentRouter.use(CheckRole.isAdmin);
adminPaymentRouter.get('/', AdminPaymentController.getAll);
adminPaymentRouter.put(
  '/change-status/:id',
  AdminPaymentController.changeStatus
);
adminPaymentRouter.get('/:id', AdminPaymentController.getById);
