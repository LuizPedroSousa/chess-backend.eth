import { Router } from 'express';
import { challengeRouter } from './container';

export class ChallengesRoutesRegistrationDependencies {
  static registry(router: Router) {
    router.use('/challenges', challengeRouter);
  }
}
