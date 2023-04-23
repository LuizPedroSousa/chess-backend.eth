import { Router } from 'express';
import { challengeRoutes } from './challengeRoutes';

const challengeRouter = Router({ mergeParams: true });

challengeRouter.use('/', challengeRoutes);

export { challengeRouter };
