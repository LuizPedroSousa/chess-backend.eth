import { User } from '@modules/users/core/domain/User';

declare namespace Express {
  export interface Request {
    user: User;
    token: Token;
  }
}
