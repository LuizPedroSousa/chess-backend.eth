import { UsersRepository } from '@modules/users/core/application/contracts/repositories/UsersRepository';
import { UserPersistenceDependencies } from '@modules/users/core/application/dependencies/UserPersistenceDependencies';
import { container } from 'tsyringe';
import { UserMap } from './mappings/UserMap';
import { PrismaUsersRepository } from './repositories/PrismaUsersRepository';

export class UsersPersistenceRegistrationDependencies {
  static registry() {
    UserMap.registry();
    container.registerSingleton<UsersRepository>(UserPersistenceDependencies.UsersRepository, PrismaUsersRepository);
  }
}
