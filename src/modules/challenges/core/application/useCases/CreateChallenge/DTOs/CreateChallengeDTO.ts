import { User } from '@modules/users/core/domain/User';

export interface CreateChallengeDTO {
  opponentId: string;
  gameId: string;
  user: User;
}
