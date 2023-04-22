import { GenericRepository } from '@shared/application/contracts/persistence/repositories/GenericRepository';
import { User } from '../../../domain/User';

export interface UsersRepository extends GenericRepository<User> {}
