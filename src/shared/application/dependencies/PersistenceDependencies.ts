import { ChallengePersistenceDependencies } from '@modules/challenges/core/application/dependencies/ChallengePersistenceDependencies';
import { UserPersistenceDependencies } from '@modules/users/core/application/dependencies/UserPersistenceDependencies';

export const PersistenceDependencies = {
  ...UserPersistenceDependencies,
  ...ChallengePersistenceDependencies,
};
