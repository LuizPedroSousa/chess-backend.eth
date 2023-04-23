import { User } from '@modules/users/core/domain/User';
import { Either } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { GetUserDTO } from './DTOs/GetUserDTO';

export interface ChessProvider {
  getUser(data: GetUserDTO): Promise<Either<NotFoundException, User>>;
}
