import { UsersRepository } from '@modules/users/core/application/contracts/repositories/UsersRepository';
import { User } from '@modules/users/core/domain/User';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { mapper } from '@shared/infra/mappings/mapper';
import { PrismaGenericRepository } from '@shared/infra/persistence/repositories/PrismaGenericRepository';
import { UserModel } from '../models/UserModel';

export class PrismaUsersRepository extends PrismaGenericRepository<User, UserModel> implements UsersRepository {
  constructor() {
    super('user', new NotFoundException('User not found'), {
      toDomain: model => mapper.map(model, UserModel, User),
      toPersistence: entity => mapper.map(entity, User, UserModel),
    });
  }
}
