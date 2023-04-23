import { Router } from 'express';
import { userAuthenticationRouter } from './userAuthenticationRoutes';
import { userRoutes } from './userRoutes';

const userRouter = Router({ mergeParams: true });

userRouter.use('/sessions', userAuthenticationRouter);

userRouter.use('/', userRoutes);

export { userRouter };
