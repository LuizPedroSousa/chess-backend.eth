import { Router } from 'express';
import { userRouter } from './container';

export class UsersRoutesRegistrationDependencies {
  static registry(router: Router) {
    router.use('/users', userRouter);
  }
}
