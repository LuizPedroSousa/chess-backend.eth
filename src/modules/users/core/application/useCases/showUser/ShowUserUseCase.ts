import { User } from '@modules/users/core/domain/User';
import { DependenciesInversion } from '@shared/application/dependencies/DependenciesInversion';
import { Either, left, right } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../contracts/repositories/UsersRepository';
import { ShowUserDTO } from './DTOs/ShowUserDTO';

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject(DependenciesInversion.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ id }: ShowUserDTO): Promise<Either<NotFoundException, User>> {
    const userExists = await this.usersRepository.getById(id);

    if (userExists.isLeft()) {
      return left(userExists.value);
    }

    return right(userExists.value);
  }
}
