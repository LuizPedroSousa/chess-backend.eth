import { User } from '@modules/users/core/domain/User';
import { Either } from '@shared/domain/Either';
import { BaseException } from '@shared/domain/exceptions/BaseException';

interface Response {
  user: User;
  access_token: string;
}

export type AuthenticateUserResponse = Promise<Either<BaseException, Response>>;
