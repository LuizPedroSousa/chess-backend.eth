import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '@shared/domain/BaseEntity';

export class User extends BaseEntity {
  @AutoMap()
  public name: string;
  @AutoMap()
  public email: string;
  @AutoMap()
  public username: string;
}
