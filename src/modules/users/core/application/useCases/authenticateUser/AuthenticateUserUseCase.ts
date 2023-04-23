import { ChessProvider } from '@shared/application/contracts/providers/ChessProvider/ChessProvider';
import { TokensProvider } from '@shared/application/contracts/providers/TokensProvider/TokensProvider';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { left, right } from '@shared/domain/Either';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../contracts/repositories/UsersRepository';
import { AuthenticateUserDTO } from './DTOs/AuthenticateUserDTO';
import { AuthenticateUserResponse } from './responses/AuthenticateUserResponse';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject(DependenciesInversion.ChessProvider)
    private readonly chessProvider: ChessProvider,

    @inject(DependenciesInversion.TokensProvider)
    private readonly tokensProvider: TokensProvider,

    @inject(DependenciesInversion.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(data: AuthenticateUserDTO): AuthenticateUserResponse {
    const userOrError = await this.chessProvider.getUser(data);

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userExists = await this.usersRepository.getById(userOrError.value.id);

    if (userExists.isLeft()) {
      userOrError.value.coins = 9999999;
      userOrError.value.score = 0;
      await this.usersRepository.create(userOrError.value);
    } else {
      Object.assign(userExists.value, userOrError.value);
      await this.usersRepository.updateById(userExists.value.id, userExists.value);
    }

    return right({
      access_token: await this.tokensProvider.generate({ access_token: data.token, user: userOrError.value }),
      user: userOrError.value,
    });
  }
}
