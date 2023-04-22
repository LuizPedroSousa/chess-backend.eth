import { AutoMap } from '@automapper/classes';

export class UserModel {
  @AutoMap()
  id: string;
  @AutoMap()
  name: string;
  @AutoMap()
  email: string;
  @AutoMap()
  username: string;
}
