import { User } from '@modules/users/core/domain/User';

export interface GenerateTokenDTO {
  access_token: string;
  user: User;
}
