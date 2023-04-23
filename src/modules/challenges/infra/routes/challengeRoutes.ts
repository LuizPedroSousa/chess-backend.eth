import { EnsureAuthentication } from '@shared/infra/http/middlewares/EnsureAuthentication';
import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import { ChallengesController } from '../controllers/ChallengesController';

const challengeRoutes = Router();

challengeRoutes.post(
  '/',
  EnsureAuthentication.handle,
  celebrate({
    body: {
      gameId: Joi.string().required(),
      opponentId: Joi.string().required(),
    },
  }),
  ChallengesController.create,
);

challengeRoutes.patch(
  '/:id',
  EnsureAuthentication.handle,
  celebrate({
    body: {
      winnerId: Joi.string().required(),
    },
  }),
  ChallengesController.updateWinner,
);

export { challengeRoutes };
