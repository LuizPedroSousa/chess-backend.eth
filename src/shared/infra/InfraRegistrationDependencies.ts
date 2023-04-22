import { Router } from 'express';
import { PersistenceRegistrationDependencies } from './persistence/PersistenceRegistrationDependencies';
import { ProviderRegistrationDependencies } from './providers/ProvidersRegistrationDependencies';
import { RoutesRegistrationDependencies } from './http/RoutesRegistrationDependencies';

export class InfraRegistrationDependencies {
  static async registry(router: Router) {
    await PersistenceRegistrationDependencies.registry();
    ProviderRegistrationDependencies.registry();
    RoutesRegistrationDependencies.registry(router);
  }
}
