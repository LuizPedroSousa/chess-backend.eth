import { UsersPersistenceRegistrationDependencies } from '@modules/users/infra/persistence/UsersPersistenceRegistrationDependencies';
import { prisma } from './orm';

export class PersistenceRegistrationDependencies {
  static async registry() {
    await prisma.$connect();
    UsersPersistenceRegistrationDependencies.registry();
  }
}
