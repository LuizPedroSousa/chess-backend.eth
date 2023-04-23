import { User } from '@modules/users/core/domain/User';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { Either, left, right } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { inject, injectable } from 'tsyringe';
import { CreateChallengeDTO } from './DTOs/CreateChallengeDTO';
import { ChallengesRepository } from '../../contracts/repositories/ChallengesRepository';

@injectable()
export class CreateChallengeUseCase {
  constructor(
    @inject(DependenciesInversion.UsersRepository)
    private readonly challengesRepository: ChallengesRepository,
  ) {}

  async execute({ id }: CreateChallengeDTO): Promise<Either<NotFoundException, User>> {
    const challengeExists = await this.challengesRepository.getById(id);

    if (challengeExists.isLeft()) {
      return left(challengeExists.value);
    }

    return right(challengeExists.value);
  }
}
