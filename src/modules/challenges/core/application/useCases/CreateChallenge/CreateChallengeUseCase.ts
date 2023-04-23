import { User } from '@modules/users/core/domain/User';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { Either, left, right } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { inject, injectable } from 'tsyringe';
import { CreateChallengeDTO } from './DTOs/CreateChallengeDTO';
import { ChallengesRepository } from '../../contracts/repositories/ChallengesRepository';
import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { AlreadyExistsException } from '@shared/domain/exceptions/AlreadyExistsException';

@injectable()
export class CreateChallengeUseCase {
  constructor(
    @inject(DependenciesInversion.ChallengesRepository)
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async execute(data: CreateChallengeDTO): Promise<Either<AlreadyExistsException, Challenge>> {
    const challengeExists = await this.challengesRepository.getByStatus('pending');

    if (challengeExists.isRight()) {
      return left(new AlreadyExistsException('Challenge already exists'));
    }

    const challenge = await this.challengesRepository.create(new Challenge(data));

    return right(challenge);
  }
}
