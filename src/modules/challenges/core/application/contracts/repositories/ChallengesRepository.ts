import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { GenericRepository } from '@shared/application/contracts/persistence/repositories/GenericRepository';

export interface ChallengesRepository extends GenericRepository<Challenge> {}
