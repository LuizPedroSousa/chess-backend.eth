import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { UsersRepository } from '@modules/users/core/application/contracts/repositories/UsersRepository';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { Either, left, right } from '@shared/domain/Either';
import { ForbiddenException } from '@shared/domain/exceptions/ForibiddenException';
import { InvalidException } from '@shared/domain/exceptions/InvalidException';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { inject, injectable } from 'tsyringe';
import { ChallengesRepository } from '../../contracts/repositories/ChallengesRepository';
import { UpdateChallengeWinnerDTO } from './DTOs/UpdateChallengeWinnerDTO';

@injectable()
export class UpdateChallengeWinnerUseCase {
  constructor(
    @inject(DependenciesInversion.ChallengesRepository)
    private readonly challengesRepository: ChallengesRepository,

    @inject(DependenciesInversion.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    user,
    id,
    winnerId,
  }: UpdateChallengeWinnerDTO): Promise<Either<NotFoundException | ForbiddenException | InvalidException, Challenge>> {
    const challengeExists = await this.challengesRepository.getById(id);

    if (challengeExists.isLeft()) {
      return left(challengeExists.value);
    }

    if (challengeExists.value.status !== 'pending') {
      return left(new InvalidException('Challenge is not running'));
    }

    if (challengeExists.value.user?.id !== user.id) {
      return left(new ForbiddenException("You don't have access to this challenge"));
    }

    if (winnerId !== challengeExists.value?.user?.id && winnerId !== challengeExists.value.opponentId) {
      return left(new ForbiddenException('Winner must be one of the players'));
    }

    challengeExists.value.status = 'finish';
    challengeExists.value.winnerId = winnerId;

    const challenge = await this.challengesRepository.updateById(id, challengeExists.value);

    if (user.id === winnerId) {
      user.lose();
    } else {
      user.win();
    }

    await this.usersRepository.updateById(user.id, user);

    return right(challenge);
  }
}
