import { UsersRoutesRegistrationDependencies } from '@modules/users/infra/routes/UsersRoutesRegistrationDependencies';
import { Router } from 'express';

export class RoutesRegistrationDependencies {
  static registry(router: Router) {
    UsersRoutesRegistrationDependencies.registry(router);
  }
}
