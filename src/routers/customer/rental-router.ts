import express from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { CheckRole } from '../../middlewares/check-role-middleware';
import { CustomerRentalController } from '../../controllers/customer/customer-rental-controller';
export const customerRentalRouter = express.Router();

customerRentalRouter.use(authMiddleware);
customerRentalRouter.use(CheckRole.isCustomer);
customerRentalRouter.get('/', CustomerRentalController.getAll);
customerRentalRouter.get('/:id', CustomerRentalController.getById);
customerRentalRouter.post('/', CustomerRentalController.create);
