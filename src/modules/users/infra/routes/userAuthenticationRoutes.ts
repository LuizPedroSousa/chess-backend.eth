import { Router } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { Joi, celebrate } from 'celebrate';

const userAuthenticationRouter = Router();

userAuthenticationRouter.post(
  '/',
  celebrate({
    body: {
      token: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  AuthenticationController.authenticate,
);

export { userAuthenticationRouter };
