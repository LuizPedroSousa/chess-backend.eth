import { ChallengesRepository } from '@modules/challenges/core/application/contracts/repositories/ChallengesRepository';
import { ChallengePersistenceDependencies } from '@modules/challenges/core/application/dependencies/ChallengePersistenceDependencies';
import { container } from 'tsyringe';
import { ChallengeMap } from './mappings/ChallengeMap';
import { PrismaChallengeRepositoenry } from './repositories/PrismaChallengesRepository';

export class ChallengesPersistenceRegistrationDependencies {
  static registry() {
    ChallengeMap.registry();
    container.registerSingleton<ChallengesRepository>(
      ChallengePersistenceDependencies.ChallengesRepository,
      PrismaChallengeRepositoenry,
    );
  }
}
