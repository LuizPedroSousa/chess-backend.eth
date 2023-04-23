import { User } from '@modules/users/core/domain/User';
import { Either } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { GetUserDTO } from './DTOs/GetUserDTO';
import { CreateChallengeDTO } from './DTOs/CreateChallengeDTO';
import { Challenge } from '@modules/challenges/core/domain/Challenge';

export interface ChessProvider {
  getUser(data: GetUserDTO): Promise<Either<NotFoundException, User>>;
  createChallenge(data: CreateChallengeDTO): Promise<Either<NotFoundException, Challenge>>
}
