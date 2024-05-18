import express from 'express';
import { authRouter } from './auth-router';
import { errorMiddleware } from '../middlewares/error-middleware';
import { adminCarRouter } from './admin/car-router';
import { customerRentalRouter } from './customer/rental-router';
import { adminPaymentRouter } from './admin/payment-router';
import { adminRentalRouter } from './admin/rental-router';
export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/admin/car', adminCarRouter);
apiRouter.use('/admin/payment', adminPaymentRouter);
apiRouter.use('/admin/rental', adminRentalRouter);
apiRouter.use('/customer/rental', customerRentalRouter);
apiRouter.use(errorMiddleware);
