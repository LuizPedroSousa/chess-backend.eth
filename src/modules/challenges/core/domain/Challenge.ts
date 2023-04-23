import { AutoMap } from '@automapper/classes';
import { User } from '@modules/users/core/domain/User';
import { BaseEntity } from '@shared/domain/BaseEntity';

export class Challenge extends BaseEntity {
  @AutoMap()
  user: User;
  @AutoMap()
  status?: string;
  @AutoMap()
  gameId: string;
  @AutoMap()
  opponentId?: string;
  @AutoMap()
  winnerId?: string;

  constructor(props: any) {
    super();
    Object.assign(this, props);
  }
}
