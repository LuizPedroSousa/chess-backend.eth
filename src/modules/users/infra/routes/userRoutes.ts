import { EnsureAuthentication } from '@shared/infra/http/middlewares/EnsureAuthentication';
import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

userRoutes.get(
  '/:id',
  EnsureAuthentication.handle,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UserController.show,
);

export { userRoutes };
