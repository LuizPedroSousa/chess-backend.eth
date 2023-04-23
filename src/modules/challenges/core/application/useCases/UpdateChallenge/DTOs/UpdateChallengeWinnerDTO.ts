import { User } from '@modules/users/core/domain/User';

export interface UpdateChallengeWinnerDTO {
  id: string;
  user: User;
  winnerId: string;
}
