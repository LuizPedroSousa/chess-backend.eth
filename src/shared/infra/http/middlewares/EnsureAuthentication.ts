import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/users/core/application/contracts/repositories/UsersRepository';
import { TokensProvider } from '@shared/application/contracts/providers/TokensProvider/TokensProvider';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { InvalidException } from '@shared/domain/exceptions/InvalidException';
import { container } from 'tsyringe';

export class EnsureAuthentication {
  static async handle(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return next(new InvalidException('JWT is missing'));
    }

    const [, token] = authHeader.split(' ');

    const tokensProvider = container.resolve<TokensProvider>(DependenciesInversion.TokensProvider);

    const decodedOrError = await tokensProvider.decode(token);

    if (decodedOrError.isLeft()) {
      throw decodedOrError.value;
    }

    const usersRepository = container.resolve<UsersRepository>(DependenciesInversion.UsersRepository);

    const userExists = await usersRepository.getById(decodedOrError.value.owner_id);

    if (userExists.isLeft()) {
      throw userExists.value;
    }

    request.user = userExists.value;
    request.token = decodedOrError.value;

    return next();
  }
}
