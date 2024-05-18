import express from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { AdminCarController } from '../../controllers/admin/admin-car-controller';
import { cdnUploadHandler } from '../../handlers/cdn-upload-handler';
import { CheckRole } from '../../middlewares/check-role-middleware';
export const adminCarRouter = express.Router();

adminCarRouter.use(authMiddleware);
adminCarRouter.use(CheckRole.isAdmin);
adminCarRouter.get('/', AdminCarController.getAll);
adminCarRouter.get('/:id', AdminCarController.getById);
adminCarRouter.post(
  '/',
  cdnUploadHandler.single('image'),
  AdminCarController.create
);
adminCarRouter.put(
  '/:id',
  cdnUploadHandler.single('image'),
  AdminCarController.update
);
adminCarRouter.delete('/:id', AdminCarController.delete);
