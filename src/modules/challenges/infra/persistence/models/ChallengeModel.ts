import { AutoMap } from '@automapper/classes';
import { UserModel } from '@modules/users/infra/persistence/models/UserModel';
import { Challenge } from '@prisma/client';
import { BaseModel } from '@shared/infra/persistence/models/BaseModel';

export class ChallengeModel extends BaseModel implements Challenge {
  @AutoMap()
  status: string;
  @AutoMap()
  gameId: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  opponentId: string;
  @AutoMap()
  winnerId?: string;
  @AutoMap()
  user?: UserModel;
}
