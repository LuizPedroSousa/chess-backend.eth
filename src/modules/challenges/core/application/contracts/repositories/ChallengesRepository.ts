import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { GenericRepository } from '@shared/application/contracts/persistence/repositories/GenericRepository';
import { Either } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';

export interface ChallengesRepository extends GenericRepository<Challenge> {
  getByStatus(status: string): Promise<Either<NotFoundException, Challenge>>;
}
